using CoolPizza.Core.Entities.Orders;

namespace CoolPizza.Core.Abstractions;

public interface IOrdersRepository
{
    Task<Order> CreateAsync();
    Task<Order?> GetFullCartByIdAsync(Guid id);
    Task<Order?> FindByIdAsync(Guid id);
    Task<decimal> UpdateTotalAmount(Guid id);
}