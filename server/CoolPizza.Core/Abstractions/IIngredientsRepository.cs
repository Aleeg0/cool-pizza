using CoolPizza.Core.Entities;
using CoolPizza.Core.Projections;

namespace CoolPizza.Core.Abstractions;

public interface IIngredientsRepository
{
    Task<List<ShortIngredientProjection>> GetShortAllAsync();
    Task<List<Ingredient>> FindRangeAsync(ICollection<Guid> ids);
}