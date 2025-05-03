using CoolPizza.Application.Categories.Commands;
using CoolPizza.Application.Categories.Queries;
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
    
    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetCategories()
    {
        var categories = await mediator.Send(new GetCategoriesQuery());
        return categories;
    }
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Category>> GetCategoryById([FromRoute] GetCategoryByIdQuery request)
    {
        var category = await mediator.Send(request);
        return category;
    }
    
    [HttpPut]
    public async Task<ActionResult<Category>> PutCategory([FromBody] PutCategoryCommand request)
    {
        var category = await mediator.Send(request);
        return category;
    }
    
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeleteCategoryById([FromRoute] DeleteCategoryByIdCommand request)
    {
        var id = await mediator.Send(request);
        return id;
    }
}