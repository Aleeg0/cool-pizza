using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class UpdatePizzaItemQuantityCommand : IRequest<OrderedPizza>
{
    public Guid? Id { get; set; }
    public Guid CartPizzaId { get; init; }
    public int NewQuantity { get; init; }
}

public class UpdatePizzaItemQuantityCommandHandler(ICartRepository cartRepository) : IRequestHandler<UpdatePizzaItemQuantityCommand, OrderedPizza>
{
    public async Task<OrderedPizza> Handle(UpdatePizzaItemQuantityCommand request, CancellationToken cancellationToken)
    {
        var result = await cartRepository.UpdatePizzaItemQuantity(request.Id!.Value, request.CartPizzaId, request.NewQuantity);
        return result;
    }
}