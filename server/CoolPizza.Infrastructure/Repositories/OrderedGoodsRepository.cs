using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class OrderedGoodsRepository(ApplicationDbContext context) : IOrderedGoodsRepository
{
    public async Task<OrderedGoods> CreateAsync(Guid cartId, Goods goods)
    {
        var orderedGoods = OrderedGoods.Create(cartId, goods);
        context.OrderedGoods.Add(orderedGoods);
        await context.SaveChangesAsync();
        return orderedGoods;
    }

    public async Task<OrderedGoods?> FindByIdAsync(Guid id) => 
        await context.OrderedGoods.FindAsync(id);
    
    public async Task<OrderedGoods?> FindByCartAndGoodAsync(Guid cartId, Guid goodsId) =>
        await context.OrderedGoods.FirstOrDefaultAsync(og => og.OrderId == cartId && og.GoodsId == goodsId);

    public async Task<bool> UpdateAsync(Guid id, int quantity)
    {
        var rowsAffected = await context.OrderedGoods
            .Where(og => og.Id == id)
            .ExecuteUpdateAsync(s => 
                s.SetProperty(og => og.Quantity, quantity)
            );
        
        return rowsAffected == 1;
    }

    public async Task<bool> RemoveAsync(Guid id)
    {
        var rowsAffected = await context.OrderedGoods
            .Where(og => og.Id == id)
            .ExecuteDeleteAsync();
        
        return rowsAffected == 1;
    }
}