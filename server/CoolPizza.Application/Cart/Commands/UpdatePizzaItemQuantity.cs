using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class UpdatePizzaItemQuantityCommand : IRequest<UpdateCartItemQuantityDto>
{
    public Guid CartId { get; init; }
    public Guid CartPizzaId { get; init; }
    public int NewQuantity { get; init; }
}

public class UpdatePizzaItemQuantityCommandHandler(
    IUnitOfWork unitOfWork,
    IOrdersRepository ordersRepository,
    IOrderedPizzasRepository orderedPizzasRepository
) : IRequestHandler<UpdatePizzaItemQuantityCommand, UpdateCartItemQuantityDto>
{
    public async Task<UpdateCartItemQuantityDto> Handle(UpdatePizzaItemQuantityCommand request, CancellationToken cancellationToken)
    {
        await unitOfWork.BeginTransactionAsync();
        
        try
        {
            // находим пиццу корзины 
            var cartGoodsItem = await orderedPizzasRepository.FindAsync(request.CartId, request.CartPizzaId);
            
            if (cartGoodsItem is null)
                throw new NotFoundException("PizzaItem", request.CartPizzaId);
                
            // обновляем количество
            await orderedPizzasRepository.UpdateAsync(request.CartPizzaId, request.NewQuantity);
            
            // пересчитываем общую стоимость
            var newTotalAmount = await ordersRepository.UpdateTotalAmount(cartGoodsItem.OrderId);
            
            // подтверждаем транзакцию
            await unitOfWork.CommitAsync();

            return new UpdateCartItemQuantityDto(
                cartGoodsItem.Id,
                cartGoodsItem.Quantity,
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