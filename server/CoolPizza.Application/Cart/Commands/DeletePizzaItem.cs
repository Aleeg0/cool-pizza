using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class DeletePizzaItemCommand : IRequest<DeleteItemDto>
{
    public Guid Id { get; init; }
    public Guid CartPizzaId { get; init; }
}

public class DeletePizzaItemHandler(ICartRepository cartRepository) : IRequestHandler<DeletePizzaItemCommand, DeleteItemDto>
{
    public async Task<DeleteItemDto> Handle(DeletePizzaItemCommand request, CancellationToken cancellationToken)
    {
        bool isDeleted = await cartRepository.DeletePizzaItem(request.Id, request.CartPizzaId);
        if (!isDeleted)
            throw new NotFoundException("Cart or Pizza Cart Item not found");
        
        return new DeleteItemDto(request.Id);
    }
}