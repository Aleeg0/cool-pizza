using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class UpdateGoodsItemQuantityCommand : IRequest<UpdateCartItemQuantityDto>
{
    public Guid CartId { get; init; }
    public Guid CartGoodsId { get; init; }
    public int NewQuantity { get; init; }
}

public class UpdateGoodsItemQuantityCommandHandler(
    IUnitOfWork unitOfWork,
    IOrdersRepository ordersRepository,
    IOrderedGoodsRepository orderedGoodsRepository
) : IRequestHandler<UpdateGoodsItemQuantityCommand, UpdateCartItemQuantityDto>
{
    public async Task<UpdateCartItemQuantityDto> Handle(UpdateGoodsItemQuantityCommand request, CancellationToken cancellationToken)
    {
        await unitOfWork.BeginTransactionAsync();
        
        try
        {
            // находим продукт в корзине
            var cartGoodsItem = await orderedGoodsRepository.FindByIdAsync(request.CartGoodsId);
            
            if (cartGoodsItem is null)
                throw new NotFoundException("CartGoods", request.CartGoodsId);
            
            // проверяем относится ли продукт к данной корзине
            if (cartGoodsItem.OrderId != request.CartId)
                throw new NotFoundException("CartGoods not found in this cart");
            
            // обновляем количество
            if (!await orderedGoodsRepository.UpdateAsync(request.CartGoodsId, request.NewQuantity))
                throw new Exception("Failed to update CartGoods quantity");
            
            // пересчитываем общую стоимость
            await ordersRepository.UpdateTotalAmount(request.CartId);
            
            // подтверждаем транзакцию
            await unitOfWork.CommitAsync();

            return new UpdateCartItemQuantityDto(
                request.CartGoodsId,
                request.NewQuantity
            );
        }
        catch
        {
            await unitOfWork.RollbackAsync();
            throw;
        }
    }
}