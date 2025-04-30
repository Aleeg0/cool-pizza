using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs.Projections;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class IngredientsRepository(ApplicationDbContext context) : IIngredientsRepository
{
    public Task<List<MenuIngredientDto>> GetAllAsync()
    {
         var query = context.Ingredients
            .Select(ingredient => new MenuIngredientDto(ingredient.Id, ingredient.Name))
            .ToListAsync();
         
         return query;
    }
}