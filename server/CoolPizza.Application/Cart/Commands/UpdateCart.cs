using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class UpdateOrderCommand : IRequest<Order>
{
    public Guid? Id { get; set; }  
    public string Name { get; init; } = "";
    public string Email { get; init; } = "";
    public string Phone { get; init; } = "";
    public string Address { get; init; } = "";
    public string? Comment { get; init; } = null;
}

public class UpdateOrderCommandHandler(IOrdersRepository ordersRepository) : IRequestHandler<UpdateOrderCommand, Order>
{
    public async Task<Order> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = await ordersRepository.UpdateAsync(
            request.Id!.Value,
            request.Name,
            request.Email,
            request.Phone,
            request.Address,
            request.Comment
        );
        
        if (order is null)
            throw new NotFoundException(nameof(Order), request.Id.Value);
        
        return order;
    }
}