using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Projections;
using MediatR;

namespace CoolPizza.Application.Products.Queries;

public class GetSearchedProductsQuery : IRequest<List<SearchedProductProjection>>
{
    public string? SearchValue { get; init; } = "";
}

public class GetSearchedProductsHandler(IProductsRepository productsRepository) : IRequestHandler<GetSearchedProductsQuery, List<SearchedProductProjection>>
{
    public async Task<List<SearchedProductProjection>> Handle(GetSearchedProductsQuery request, CancellationToken cancellationToken)
    {
        var searchedProducts = await productsRepository.GetSearchedAsync(request.SearchValue);
        return searchedProducts;
    }
}