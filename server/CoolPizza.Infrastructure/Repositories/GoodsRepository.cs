using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Infrastructure.Data;

namespace CoolPizza.Infrastructure.Repositories;

public class GoodsRepository(ApplicationDbContext context) : IGoodsRepository
{
    public async Task<Goods?> FindByIdAsync(Guid id) =>
        await context.Goods.FindAsync(id);
}