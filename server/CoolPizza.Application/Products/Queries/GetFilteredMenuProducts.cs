using CoolPizza.Application.Products.DTOs;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Projections;
using CoolPizza.Core.Enums;
using MediatR;

namespace CoolPizza.Application.Products.Queries;

public class GetFilteredMenuProductsQuery : IRequest<List<MenuProductsDto>>
{
    public List<Guid> IngredientsIds { get; init; } = [];
    public decimal? PriceMin { get; init; }
    public decimal? PriceMax { get; init; }
    public SortOption SortBy { get; set; }
}

public class GetFilteredMenuProductsHandler(IProductsRepository productsRepository, ICategoriesRepository categoriesRepository) :
    IRequestHandler<GetFilteredMenuProductsQuery, List<MenuProductsDto>>
{
    public async Task<List<MenuProductsDto>> Handle(GetFilteredMenuProductsQuery request, CancellationToken cancellationToken)
    {
        var filters = new ProductFiltersDto(request.IngredientsIds, request.PriceMin, request.PriceMax);
        // get categories and products
        var categories = await categoriesRepository.GetAllAsync();
        var products = await productsRepository.GetFilteredAsync(filters, request.SortBy);
        
        // group products by categories and remove empty categories
        var result = categories
            .Select(category => new MenuProductsDto
            (
                category,
                products
                    .Where(product => product.CategoryId == category.Id)
                    .ToList()
            ))
            .Where(group => group.MenuProducts.Count > 0)
            .ToList();
        
        return result;
    }
}