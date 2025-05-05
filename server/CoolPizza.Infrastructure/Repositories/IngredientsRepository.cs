using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using CoolPizza.Core.Projections;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class IngredientsRepository(ApplicationDbContext context) : IIngredientsRepository
{
    public async Task<List<ShortIngredientProjection>> GetShortAllAsync()
    {
         return await context.Ingredients
            .Select(ingredient => new ShortIngredientProjection(ingredient.Id, ingredient.Name))
            .ToListAsync();
    }

    public Task<List<Ingredient>> FindRangeAsync(ICollection<Guid> ids)
    {
        return context.Ingredients
            .Where(ingredient => ids.Contains(ingredient.Id))
            .ToListAsync();
    }
}