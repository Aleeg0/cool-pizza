using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Enums;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class OrdersRepository(ApplicationDbContext context) : IOrdersRepository
{
    public async Task<Order> CreateAsync()
    {
        var newOrder = new Order();
        await context.Orders.AddAsync(newOrder);
        await context.SaveChangesAsync();
        return newOrder;
    }
    
    public async Task<Order?> GetFullCartByIdAsync(Guid id) =>
        await context.Orders
            .Where(o => o.Id == id)
            .Include(o => o.PizzasLine).ThenInclude(op => op.Pizza)
            .Include(o => o.PizzasLine).ThenInclude(op => op.Ingredients)
            .Include(o => o.GoodsLine).ThenInclude(og => og.Goods)
            .AsSplitQuery()
            .FirstOrDefaultAsync();

    public async Task<Order?> FindByIdAsync(Guid id) => 
        await context.Orders.FindAsync(id);

    public async Task<decimal> UpdateTotalAmount(Guid id)
    {
        // считаем сумму каждой Line
        decimal calculatedTotalAmount = await UpdatePizzasTotalAmount(id) +
                                        await UpdateGoodsTotalAmount(id);
        
        // обновляем значение
        await context.Orders
            .Where(o => o.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(o => o.TotalAmount, calculatedTotalAmount));
        
        return calculatedTotalAmount;
    }

    public async Task<Order?> UpdateAsync(
        Guid id,
        string name,
        string email,
        string phone,
        string address,
        string? comment,
        Guid? userId
    ) {
        Order? order = await FindByIdAsync(id);

        if (order == null)
            return null;
        
        order.AddPersonalInfo(
            name,
            email,
            phone,
            address,
            comment
        );
        
        if (userId.HasValue)
            order.AddUserId(userId.Value);

        order.Status = OrderStatus.Ready;
        
        context.Orders.Update(order);
        await context.SaveChangesAsync();
        
        return order;
    }

    private async Task<decimal> UpdatePizzasTotalAmount(Guid cartId) =>
        await context.OrderedPizzas
            .Where(op => op.OrderId == cartId)
            .Select(op => new 
            {
                PizzaTotal = op.Quantity * op.Pizza.Price,
                IngredientsTotal = op.Ingredients.Sum(i => i.Price)
            })
            .SumAsync(op => op.PizzaTotal + op.IngredientsTotal);

    private async Task<decimal> UpdateGoodsTotalAmount(Guid cartId) => 
        await context.OrderedGoods
            .Where(op => op.OrderId == cartId)
            .Join(context.Goods,
                og => og.GoodsId,
                g => g.Id,
                (og, g) => og.Quantity * g.Price)
            .SumAsync();
}