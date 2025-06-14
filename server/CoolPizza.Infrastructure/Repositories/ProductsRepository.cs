﻿using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Core.Enums;
using CoolPizza.Core.Projections;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class ProductsRepository(ApplicationDbContext context) : IProductsRepository
{
    public async Task<List<MenuProductProjection>> GetMenuAllAsync(ProductFiltersDto filtersDto, SortOption sortOption)
    {
        IQueryable<Product> query = context.Products.AsQueryable();

        // Фильтрация по типу и ингредиентам
        if (filtersDto.IngredientsIds.Count > 0)
        {
            query = query
                .Where(p => p.Type == ProductType.Pizza)
                .Include(p => p.Pizzas)
                .ThenInclude(p => p.Ingredients)
                .Where(product =>
                    product.Pizzas.Any(pizza =>
                        filtersDto.IngredientsIds.All(id =>
                            pizza.Ingredients.Any(i => i.Id == id)
                        )
                    )
                );
        }

        // price filtration
        if (filtersDto.MinPrice.HasValue)
        {
            query = query.Where(product => product.BasePrice >= filtersDto.MinPrice.Value);
        }

        if (filtersDto.MaxPrice.HasValue)
        {
            query = query.Where(product => product.BasePrice <= filtersDto.MaxPrice.Value);
        }
        
        // sorting
        query = SortProducts(query, sortOption); 

        IQueryable<MenuProductProjection> result = query.Select(p => new MenuProductProjection(
            p.Id,
            p.Name,
            p.Description,
            p.BaseImg,
            p.BasePrice,
            p.CategoryId
        ));
        
        return await result.ToListAsync();
    }

    public async Task<List<CartProductProjection>> GetCartProjectionRangeAsync(ICollection<Guid> productsIds) =>
        await context.Products
            .Where(p => productsIds.Contains(p.Id))
            .Select(p => new CartProductProjection(p.Id, p.Name, p.BaseImg))
            .ToListAsync();

    public async Task<List<SearchedProductProjection>> GetSearchedAsync(string searchValue)
    {
        var result = await context.Products
            .Where(p => EF.Functions.ILike(p.Name, $"%{searchValue}%"))
            .Select(p => new SearchedProductProjection(p.Id, p.Name, p.BaseImg))
            .ToListAsync();
        
        return result;
    }

    public async Task<Product?> GetByIdAsync(Guid id)
    {
        var product = await context.Products
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return null;

        if (product.Type == ProductType.Pizza)
        {
            await context.Entry(product)
                .Collection(p => p.Pizzas)
                .Query()
                .Include(pizza => pizza.Ingredients)
                .LoadAsync();
        }
        else if (product.Type == ProductType.Goods)
        {
            await context.Entry(product)
                .Collection(p => p.Goods)
                .LoadAsync();
        }

        return product;
    }

    public async Task<Product?> FindByIdAsync(Guid id)
    {
        return await context.Products.FindAsync(id);
    }

    private IQueryable<Product> SortProducts(IQueryable<Product> query, SortOption sortOption)
    {
        return sortOption switch
        {
            SortOption.Newest => query.OrderByDescending(p => p.CreatedAt),
            SortOption.PriceAsc => query.OrderBy(p => p.BasePrice),
            SortOption.PriceDesc => query.OrderByDescending(p => p.BasePrice),
            _ => query
        };
    }
}