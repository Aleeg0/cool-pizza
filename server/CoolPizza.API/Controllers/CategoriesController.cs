using CoolPizza.Application.Categories.Commands;
using CoolPizza.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Category>> CreateAsync([FromBody] CreateCategoryCommand request)
    {
        var newCategory = await mediator.Send(request);
        return newCategory;
    }
}