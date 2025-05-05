using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class DeleteGoodsItemCommand : IRequest
{
    public Guid CartId { get; init; }
    public Guid CartGoodsId { get; init; }
}

public class DeleteGoodsItemCommandHandler(
    IUnitOfWork unitOfWork,
    IOrdersRepository ordersRepository,
    IOrderedGoodsRepository orderedGoodsRepository
) : IRequestHandler<DeleteGoodsItemCommand>
{
    public async Task Handle(DeleteGoodsItemCommand request, CancellationToken cancellationToken)
    {
        await unitOfWork.BeginTransactionAsync();
        
        try
        {
            // находим продукт корзины 
            var cartGoodsItem = await orderedGoodsRepository.FindByIdAsync(request.CartGoodsId);
            
            if (cartGoodsItem is null)
                throw new NotFoundException("GoodsItem", request.CartGoodsId);
            
            // проверяем относится ли продукт к данной корзине
            if (cartGoodsItem.OrderId != request.CartId)
                throw new NotFoundException("CartGoods not found in this cart");
                
            // обновляем количество
            if (!await orderedGoodsRepository.RemoveAsync(request.CartGoodsId))
                throw new Exception("Something went wrong while deleting the cart goods.");
            
            // пересчитываем общую стоимость
            await ordersRepository.UpdateTotalAmount(cartGoodsItem.OrderId);
            
            // подтверждаем транзакцию
            await unitOfWork.CommitAsync();
        }
        catch
        {
            await unitOfWork.RollbackAsync();
            throw;
        }
    }
}