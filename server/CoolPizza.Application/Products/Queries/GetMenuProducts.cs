using CoolPizza.Application.Products.DTOs;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Projections;
using CoolPizza.Core.Enums;
using MediatR;

namespace CoolPizza.Application.Products.Queries;

public class GetMenuProductsQuery : IRequest<List<MenuProductsDto>>
{
    public List<Guid> IngredientsIds { get; init; } = [];
    public decimal? PriceMin { get; init; }
    public decimal? PriceMax { get; init; }
    public SortOption SortBy { get; set; }
}

public class GetMenuProductsHandler(IProductsRepository productsRepository, ICategoriesRepository categoriesRepository) :
    IRequestHandler<GetMenuProductsQuery, List<MenuProductsDto>>
{
    public async Task<List<MenuProductsDto>> Handle(GetMenuProductsQuery request, CancellationToken cancellationToken)
    {
        var filters = new ProductFiltersDto(request.IngredientsIds, request.PriceMin, request.PriceMax);
        // get categories and products
        var categories = await categoriesRepository.GetAllAsync();
        var products = await productsRepository.GetMenuAllAsync(filters, request.SortBy);
        
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