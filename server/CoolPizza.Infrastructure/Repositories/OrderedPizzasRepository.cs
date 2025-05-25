using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class OrderedPizzasRepository(ApplicationDbContext context) : IOrderedPizzasRepository
{
    public async Task<OrderedPizza> CreateAsync(Guid cartId, Pizza pizza, List<Ingredient> ingredient)
    {
        var orderedPizza = OrderedPizza.Create(cartId, pizza, ingredient);
        context.OrderedPizzas.Add(orderedPizza);
        await context.SaveChangesAsync();
        return orderedPizza;
    }
    
    public async Task<OrderedPizza?> FindByIdAsync(Guid id) => 
        await context.OrderedPizzas.FindAsync(id);
    public async Task<OrderedPizza?> FindByCartAndPizzaAsync(Guid cartId, Guid pizzaId) => 
        await context.OrderedPizzas.FirstOrDefaultAsync(op => op.PizzaId == pizzaId && op.OrderId == cartId);

    public async Task<bool> UpdateAsync(Guid id, int quantity)
    {
        var rowsAffected = await context.OrderedPizzas
            .Where(op => op.Id == id)
            .ExecuteUpdateAsync(s =>
                s.SetProperty(op => op.Quantity, quantity)
            );
        
        return rowsAffected == 1;
    }

    public async Task<bool> RemoveAsync(Guid id)
    {
        var rowsAffected = await context.OrderedPizzas
            .Where(op => op.Id == id)
            .ExecuteDeleteAsync();
        
        return rowsAffected == 1;
    }
}