using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Infrastructure.Data;

namespace CoolPizza.Infrastructure.Repositories;

public class PizzasRepository(ApplicationDbContext context) : IPizzasRepository
{
    public async Task<Pizza?> FindByIdAsync(Guid id) => 
        await context.Pizzas.FindAsync(id);
}