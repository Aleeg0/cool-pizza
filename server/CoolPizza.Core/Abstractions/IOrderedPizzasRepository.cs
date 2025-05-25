using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Abstractions;

public interface IOrderedPizzasRepository
{
    Task<OrderedPizza> CreateAsync(Guid cartId, Pizza pizza, List<Ingredient> ingredient);
    Task<OrderedPizza?> FindByIdAsync(Guid id);
    Task<OrderedPizza?> FindByCartAndPizzaAsync(Guid cartId, Guid pizzaId);
    Task<bool> UpdateAsync(Guid id, int quantity);
    Task<bool> RemoveAsync(Guid id);
}