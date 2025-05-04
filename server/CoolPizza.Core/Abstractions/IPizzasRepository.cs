using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Abstractions;

public interface IPizzasRepository
{
    Task<Pizza?> FindByIdAsync(Guid id);
}