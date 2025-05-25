using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Queries;

public class GetCartTotalAmountByIdQuery : IRequest<GetTotalAmountDto>
{
    public Guid Id { get; init; }
}

public class GetCartTotalAmountQueryHandler(IOrdersRepository ordersRepository) : IRequestHandler<GetCartTotalAmountByIdQuery, GetTotalAmountDto>
{
    public async Task<GetTotalAmountDto> Handle(GetCartTotalAmountByIdQuery request, CancellationToken cancellationToken)
    {
        var order = await ordersRepository.FindByIdAsync(request.Id);
        if (order is null)
            throw new NotFoundException("Cart", request.Id);
        
        return new GetTotalAmountDto(order.TotalAmount);
    }
}