using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class DeleteGoodsItemCommand : IRequest<DeleteItemDto>
{
    public Guid Id { get; init; }
    public Guid CartGoodsId { get; init; }
}

public class DeleteGoodsItemCommandHandler(ICartRepository cartRepository) : IRequestHandler<DeleteGoodsItemCommand, DeleteItemDto>
{
    public async Task<DeleteItemDto> Handle(DeleteGoodsItemCommand request, CancellationToken cancellationToken)
    {
        var isDeleted = await cartRepository.DeleteGoodsItem(request.Id, request.CartGoodsId);
        if (!isDeleted)
            throw new NotFoundException("Cart or Goods Cart Item not found");
        
        return new DeleteItemDto(request.Id);
    }
}