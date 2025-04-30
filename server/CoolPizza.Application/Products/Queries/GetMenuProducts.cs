using CoolPizza.Application.Products.DTOs;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Enums;
using MediatR;

namespace CoolPizza.Application.Products.Queries;

public class GetMenuProductsQuery() : IRequest<List<MenuProductsDto>>
{
    public SortOption SortBy { get; init; }
}

public class GetMenuProductsHandler(IProductsRepository productsRepository, ICategoriesRepository categoriesRepository) :
    IRequestHandler<GetMenuProductsQuery, List<MenuProductsDto>>
{
    public async Task<List<MenuProductsDto>> Handle(
        GetMenuProductsQuery request,
        CancellationToken cancellationToken
    )
    {
        // get categories and products
        var categories = await categoriesRepository.GetAllAsync();
        var products = await productsRepository.GetMenuAllAsync(request.SortBy);

        // group products by categories
        var result = categories
            .Select(category => new MenuProductsDto
            (
                category,
                products
                    .Where(product => product.CategoryId == category.Id)
                    .ToList()
            ))
            .ToList();
        
        return result;
    }
}