using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs.Orders;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class CreateGoodsItemCommand : IRequest<OrderedGoodsDto>
{
    public Guid? Id { get; set; }
    public Guid GoodsId { get; init; }
}

public class CreateGoodsItemHandler(ICartRepository cartRepository) : IRequestHandler<CreateGoodsItemCommand, OrderedGoodsDto>
{
    public async Task<OrderedGoodsDto> Handle(CreateGoodsItemCommand request, CancellationToken cancellationToken)
    {
       // потом работаем с ней
        var createCartPizza = await cartRepository.AddGoodsItem(request.Id, request.GoodsId);
        return createCartPizza;
    }
}