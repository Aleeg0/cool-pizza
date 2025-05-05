using CoolPizza.Application.Products.DTOs;
using CoolPizza.Application.Products.Queries;
using CoolPizza.Core.Enums;
using CoolPizza.Core.Projections;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IMediator mediator) : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductWithVariationsDto>> GetById([FromRoute] GetProductByIdQuery query)
    {
        var product = await mediator.Send(query);
        return Ok(product);
    }
    
    [HttpGet("search")]
    public async Task<ActionResult<List<SearchedProductProjection>>> GetSearchedProducts([FromQuery] GetSearchedProductsQuery query)
    {
        var products = await mediator.Send(query);
        return Ok(products);
    }
    
    [HttpPost("menu")]
    public async Task<ActionResult<MenuProductsDto>> GetMenuProducts([FromBody] GetMenuProductsQuery query, [FromQuery] SortOption sortBy)
    {
        query.SortBy = sortBy;
        var products = await mediator.Send(query);
        return Ok(products);
    }
}