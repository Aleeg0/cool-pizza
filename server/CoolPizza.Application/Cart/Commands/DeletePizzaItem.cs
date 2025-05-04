using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class DeletePizzaItemCommand : IRequest<DeleteCartItemDto>
{
    public Guid CartId { get; init; }
    public Guid CartPizzaId { get; init; }
}

public class DeletePizzaItemHandler(
    IUnitOfWork unitOfWork,
    IOrdersRepository ordersRepository,
    IOrderedPizzasRepository orderedPizzasRepository
) : IRequestHandler<DeletePizzaItemCommand, DeleteCartItemDto>
{
    public async Task<DeleteCartItemDto> Handle(DeletePizzaItemCommand request, CancellationToken cancellationToken)
    {
        await unitOfWork.BeginTransactionAsync();
        
        try
        {
            // находим пиццу корзины 
            var cartGoodsItem = await orderedPizzasRepository.FindAsync(request.CartId, request.CartPizzaId);
            
            if (cartGoodsItem is null)
                throw new NotFoundException("PizzaItem", request.CartPizzaId);
                
            // удаляем пиццу из корзины 
            if (!await orderedPizzasRepository.RemoveAsync(request.CartPizzaId))
                throw new Exception("Something went wrong while deleting the cart pizza.");
            
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