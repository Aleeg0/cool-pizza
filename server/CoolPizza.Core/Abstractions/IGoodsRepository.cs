using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Abstractions;

public interface IGoodsRepository
{
    Task<Goods?> FindByIdAsync(Guid id);
}