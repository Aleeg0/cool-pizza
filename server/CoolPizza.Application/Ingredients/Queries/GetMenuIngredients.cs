using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Projections;
using MediatR;

namespace CoolPizza.Application.Ingredients.Queries;

public record GetMenuIngredientsQuery : IRequest<List<ShortIngredientProjection>> { }

public class GetMenuIngredientsHandler(IIngredientsRepository ingredientsRepository) :
    IRequestHandler<GetMenuIngredientsQuery, List<ShortIngredientProjection>>
{
    public async Task<List<ShortIngredientProjection>> Handle(GetMenuIngredientsQuery request, CancellationToken cancellationToken)
    {
        var ingredients = await ingredientsRepository.GetShortAllAsync();
        
        var result = ingredients
            .Select(ingredient => new ShortIngredientProjection
                (
                     ingredient.Id,
                    ingredient.Name
                )
            )
            .ToList();
        
        return result;
    }
}