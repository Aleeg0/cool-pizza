using CoolPizza.Application.Products.DTOs;
using CoolPizza.Application.Products.Queries;
using CoolPizza.Core.DTOs.Projections;
using CoolPizza.Core.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IMediator mediator) : ControllerBase
{
    [HttpGet("menu")]
    public async Task<ActionResult<MenuProductsDto>> GetMenuProducts([FromQuery] GetMenuProductsQuery query)
    {
        var products = await mediator.Send(query);
        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductWithVariationsDto>> GetById([FromRoute] GetProductByIdQuery query)
    {
        var product = await mediator.Send(query);
        return Ok(product);
    }
    
    [HttpGet("search")]
    public async Task<ActionResult<List<SearchedProductDto>>> GetSearchedProducts([FromQuery] GetSearchedProductsQuery query)
    {
        var products = await mediator.Send(query);
        return Ok(products);
    }
    
    [HttpPost("menu/filtered")]
    public async Task<ActionResult<MenuProductsDto>> GetFilteredMenuProducts([FromBody] GetFilteredMenuProductsQuery query, [FromQuery] SortOption sortBy)
    {
        query.SortBy = sortBy;
        var products = await mediator.Send(query);
        return Ok(products);
    }
}