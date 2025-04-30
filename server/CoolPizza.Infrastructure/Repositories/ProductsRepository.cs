using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Projections;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Core.Enums;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class ProductsRepository(ApplicationDbContext context) : IProductsRepository
{
    public async Task<List<MenuProductDto>> GetMenuAllAsync(SortOption sortOption)
    {
        IQueryable<Product> query = context.Products.AsQueryable();
        
        // sorting
        query = SortProducts(query, sortOption); 
        
        IQueryable<MenuProductDto> result = query.Select(p => new MenuProductDto(
            p.Id,
            p.Name,
            p.Description,
            p.BaseImg,
            p.BasePrice,
            p.CategoryId
        ));
        
        return await result.ToListAsync();
    }

    public async Task<List<MenuProductDto>> GetFilteredAsync(ProductFiltersDto filtersDto, SortOption sortOption)
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

        IQueryable<MenuProductDto> result = query.Select(p => new MenuProductDto(
            p.Id,
            p.Name,
            p.Description,
            p.BaseImg,
            p.BasePrice,
            p.CategoryId
        ));
        
        return await result.ToListAsync();
    }

    public async Task<List<SearchedProductDto>> GetSearchedAsync(string searchValue)
    {
        var result = await context.Products
            .Where(p => EF.Functions.ILike(p.Name, $"%{searchValue}%"))
            .Select(p => new SearchedProductDto(p.Id, p.Name, p.BaseImg))
            .ToListAsync();
        
        return result;
    }

    public Task<Product?> GetByIdAsync(Guid id)
    {
        return context.Products.FirstOrDefaultAsync(product => product.Id == id);
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