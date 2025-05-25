using CoolPizza.Core.Entities.Orders;

namespace CoolPizza.Core.Abstractions;

public interface IOrdersRepository
{
    Task<Order> CreateAsync();
    Task<Order?> GetFullCartByIdAsync(Guid id);
    Task<List<Order>> GetFullOrdersByUserIdAsync(Guid userId);
    Task<Order?> FindByIdAsync(Guid id);
    Task<decimal> UpdateTotalAmount(Guid id);

    Task<Order?> UpdateAsync(
        Guid id,
        string name,
        string email,
        string phone,
        string address,
        string? comment,
        Guid? userId
    );
}