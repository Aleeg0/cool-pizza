using CoolPizza.Application.Exceptions;
using CoolPizza.Application.Products.DTOs;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Core.Enums;
using MediatR;

namespace CoolPizza.Application.Products.Queries;

public class GetProductByIdQuery : IRequest<ProductWithVariationsDto?>
{
    public Guid Id { get; init; }
}

public class GetProductByIdQueryHandler(IProductsRepository productsRepository) :
    IRequestHandler<GetProductByIdQuery, ProductWithVariationsDto?>
{
    public async Task<ProductWithVariationsDto?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await productsRepository.GetByIdAsync(request.Id);

        if (product == null)
            throw new NotFoundException(nameof(Product), request.Id);

        var variations = product.Type switch
        {
            ProductType.Goods => product.Goods.Cast<Variation>().ToList(),
            ProductType.Pizza => product.Pizzas.Cast<Variation>().ToList(),
            _ => throw new NotImplementedException(),
        };

        var result = new ProductWithVariationsDto
        (
            product.Id,
            product.Name,
            product.Description,
            product.BaseImg,
            product.BasePrice,
            product.Type,
            product.CreatedAt,
            product.CategoryId,
            variations
        );

        return result;
    }
}