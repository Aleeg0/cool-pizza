using CoolPizza.Application.Ingredients.Queries;
using CoolPizza.Core.DTOs.Projections;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController(IMediator mediator) : ControllerBase
{
    
    [HttpGet("menu")]
    public async Task<ActionResult<List<MenuIngredientDto>>> GetMenuIngredients()
    {
        var ingredients = await mediator.Send(new GetMenuIngredientsQuery());
        return ingredients;
    }
}