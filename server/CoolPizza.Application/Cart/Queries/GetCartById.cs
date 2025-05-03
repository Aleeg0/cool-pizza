using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using MediatR;

namespace CoolPizza.Application.Cart.Queries;

public class GetCartByIdQuery : IRequest<GetCartDto>
{
    public Guid Id { get; init; }
}

public class GetCartByIdQueryHandler(ICartRepository cartRepository) : IRequestHandler<GetCartByIdQuery, GetCartDto>
{
    public async Task<GetCartDto> Handle(GetCartByIdQuery request, CancellationToken cancellationToken)
    {
        var cartInfo = await cartRepository.GetCartById(request.Id);

        if (cartInfo is null)
            throw new NotFoundException(nameof(Order), request.Id);

        return new GetCartDto(
            cartInfo.Order.Id,
            cartInfo.CartPizzaLines,
            cartInfo.CartGoodsLines,
            cartInfo.Order.TotalAmount
        );
    }
}