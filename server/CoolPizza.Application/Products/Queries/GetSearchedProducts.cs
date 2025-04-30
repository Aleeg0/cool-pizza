using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs.Projections;
using MediatR;

namespace CoolPizza.Application.Products.Queries;

public class GetSearchedProductsQuery : IRequest<List<SearchedProductDto>>
{
    public string? SearchValue { get; init; } = "";
}

public class GetSearchedProductsHandler(IProductsRepository productsRepository) : IRequestHandler<GetSearchedProductsQuery, List<SearchedProductDto>>
{
    public async Task<List<SearchedProductDto>> Handle(GetSearchedProductsQuery request, CancellationToken cancellationToken)
    {
        var searchedProducts = await productsRepository.GetSearchedAsync(request.SearchValue);
        return searchedProducts;
    }
}