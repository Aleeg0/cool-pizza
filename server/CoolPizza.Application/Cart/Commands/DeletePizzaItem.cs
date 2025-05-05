using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class DeletePizzaItemCommand : IRequest
{
    public Guid CartId { get; init; }
    public Guid CartPizzaId { get; init; }
}

public class DeletePizzaItemHandler(
    IUnitOfWork unitOfWork,
    IOrdersRepository ordersRepository,
    IOrderedPizzasRepository orderedPizzasRepository
) : IRequestHandler<DeletePizzaItemCommand>
{
    public async Task Handle(DeletePizzaItemCommand request, CancellationToken cancellationToken)
    {
        await unitOfWork.BeginTransactionAsync();
        
        try
        {
            // находим пиццу корзины 
            var cartGoodsItem = await orderedPizzasRepository.FindByIdAsync(request.CartPizzaId);
            
            if (cartGoodsItem is null)
                throw new NotFoundException("CartPizza", request.CartPizzaId);
            
            // проверяем относится ли пицца к данной корзине
            if (cartGoodsItem.OrderId != request.CartId)
                throw new NotFoundException("CartPizza not found in this cart");
                
            // удаляем пиццу из корзины 
            if (!await orderedPizzasRepository.RemoveAsync(request.CartPizzaId))
                throw new Exception("Something went wrong while deleting the cart pizza.");
            
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