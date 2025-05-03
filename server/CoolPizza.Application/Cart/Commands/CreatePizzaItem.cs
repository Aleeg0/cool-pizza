using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs.Orders;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class CreatePizzaItemCommand :IRequest<OrderedPizzaDto>
{
    public Guid? Id { get; set; }
    public Guid PizzaId { get; init; }
    public List<Guid> IngredientsIds { get; init; } = [];
}

public class CreatePizzaItemHandler(ICartRepository cartRepository) : IRequestHandler<CreatePizzaItemCommand, OrderedPizzaDto>
{
    public async Task<OrderedPizzaDto> Handle(CreatePizzaItemCommand request, CancellationToken cancellationToken)
    {
       // потом работаем с ней
        var createCartPizza = await cartRepository.AddPizzaItem(request.Id, request.PizzaId, request.IngredientsIds);
        return createCartPizza;
    }
}