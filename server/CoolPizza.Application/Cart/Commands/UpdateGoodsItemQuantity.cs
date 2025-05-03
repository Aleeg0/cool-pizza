using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class UpdateGoodsItemQuantityCommand : IRequest<OrderedGoods>
{
    public Guid? Id { get; set; }
    public Guid CartGoodsId { get; init; }
    public int NewQuantity { get; init; }
}

public class UpdateGoodsItemQuantityCommandHandler(ICartRepository cartRepository) : IRequestHandler<UpdateGoodsItemQuantityCommand, OrderedGoods>
{
    public async Task<OrderedGoods> Handle(UpdateGoodsItemQuantityCommand request, CancellationToken cancellationToken)
    {
        var result = await cartRepository.UpdateGoodsItemQuantity(request.Id!.Value, request.CartGoodsId, request.NewQuantity);
        return result;
    }
}