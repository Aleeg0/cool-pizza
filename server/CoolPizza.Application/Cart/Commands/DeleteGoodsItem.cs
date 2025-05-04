using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class DeleteGoodsItemCommand : IRequest<DeleteCartItemDto>
{
    public Guid CartId { get; init; }
    public Guid CartGoodsId { get; init; }
}

public class DeleteGoodsItemCommandHandler(
    IUnitOfWork unitOfWork,
    IOrdersRepository ordersRepository,
    IOrderedGoodsRepository orderedGoodsRepository
) : IRequestHandler<DeleteGoodsItemCommand, DeleteCartItemDto>
{
    public async Task<DeleteCartItemDto> Handle(DeleteGoodsItemCommand request, CancellationToken cancellationToken)
    {
        await unitOfWork.BeginTransactionAsync();
        
        try
        {
            // находим продукт корзины 
            var cartGoodsItem = await orderedGoodsRepository.FindAsync(request.CartId, request.CartGoodsId);
            
            if (cartGoodsItem is null)
                throw new NotFoundException("GoodsItem", request.CartGoodsId);
                
            // обновляем количество
            if (!await orderedGoodsRepository.RemoveAsync(request.CartGoodsId))
                throw new Exception("Something went wrong while deleting the cart goods.");
            
            // пересчитываем общую стоимость
            var newTotalAmount = await ordersRepository.UpdateTotalAmount(cartGoodsItem.OrderId);
            
            // подтверждаем транзакцию
            await unitOfWork.CommitAsync();

            return new DeleteCartItemDto(
                cartGoodsItem.Id,
                newTotalAmount
            );
        }
        catch
        {
            await unitOfWork.RollbackAsync();
            throw;
        }
    }
}