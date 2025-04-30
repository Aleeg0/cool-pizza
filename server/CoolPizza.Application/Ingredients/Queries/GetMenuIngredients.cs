using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs.Projections;
using MediatR;

namespace CoolPizza.Application.Ingredients.Queries;

public record GetMenuIngredientsQuery : IRequest<List<MenuIngredientDto>> { }

public class GetMenuIngredientsHandler(IIngredientsRepository ingredientsRepository) :
    IRequestHandler<GetMenuIngredientsQuery, List<MenuIngredientDto>>
{
    public async Task<List<MenuIngredientDto>> Handle(GetMenuIngredientsQuery request, CancellationToken cancellationToken)
    {
        var ingredients = await ingredientsRepository.GetAllAsync();
        
        var result = ingredients
            .Select(ingredient => new MenuIngredientDto
                (
                     ingredient.Id,
                    ingredient.Name
                )
            )
            .ToList();
        
        return result;
    }
}