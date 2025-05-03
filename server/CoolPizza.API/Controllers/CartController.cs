using CoolPizza.Application.Cart.Commands;
using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Cart.Queries;
using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Orders;
using CoolPizza.Core.Entities.Orders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController(IMediator mediator) : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetCartDto>> GetCartById(
        [FromRoute] GetCartByIdQuery query
    )
    {
        var cartInfo = await mediator.Send(query);
        return Ok(cartInfo);
    }
    
    [HttpPost("pizza")]
    public async Task<ActionResult<OrderedPizzaDto>> CreatePizzaCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid? id,
        [FromBody] CreatePizzaItemCommand command
    )
    {
        command.Id = id;
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id!.Value.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpPatch("pizza")]
    public async Task<ActionResult<OrderedPizza>> UpdatePizzaCartItemQuantity(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromBody] UpdatePizzaItemQuantityCommand command
    )
    {
        command.Id = id;
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpDelete("pizza")]
    public async Task<ActionResult<DeleteItemDto>> DeletePizzaCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromBody] DeletePizzaItemCommand command
    )
    {
        command.Id = id;
        var deleteItemDto = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id!.Value.ToString());
        
        return Ok(deleteItemDto);
    }
    
    [HttpPost("goods")]
    public async Task<ActionResult<OrderedGoodsDto>> CreateGoodsCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid? id,
        [FromBody] CreateGoodsItemCommand command
    )
    {
        command.Id = id;
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id!.Value.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpPatch("goods")]
    public async Task<ActionResult<OrderedGoods>> UpdateGoodsCartItemQuantity(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromBody] UpdateGoodsItemQuantityCommand command
    )
    {
        command.Id = id;
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id!.Value.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpDelete("goods")]
    public async Task<ActionResult<DeleteItemDto>> DeleteGoodsCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromBody] DeleteGoodsItemCommand command
    )
    {
        command.Id = id;
        var deleteItemDto = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id!.Value.ToString());
        
        return Ok(deleteItemDto);
    }
}