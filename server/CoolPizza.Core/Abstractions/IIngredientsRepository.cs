using CoolPizza.Core.DTOs.Projections;

namespace CoolPizza.Core.Abstractions;

public interface IIngredientsRepository
{
    Task<List<MenuIngredientDto>> GetAllAsync();
}