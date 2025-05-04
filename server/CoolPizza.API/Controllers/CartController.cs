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
    [HttpGet]
    public async Task<ActionResult<GetCartDto>> GetCartById(
        [FromHeader(Name = "X-Cart-Token")] Guid id
    )
    {
        var query = new GetCartByIdQuery()
        {
            Id = id
        };
        var cartInfo = await mediator.Send(query);
        return Ok(cartInfo);
    }
    
    [HttpPost("pizzas")]
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
    
    [HttpPatch("pizzas/{id:guid}")]
    public async Task<ActionResult<OrderedPizza>> UpdatePizzaCartItemQuantity(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute] Guid pizzaId,
        [FromBody] int quantity
    )
    {
        var command = new UpdatePizzaItemQuantityCommand()
        {
            Id = id,
            CartPizzaId = pizzaId,
            NewQuantity = quantity,
        };
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpDelete("pizzas/{id:guid}")]
    public async Task<ActionResult<DeleteItemDto>> DeletePizzaCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute] Guid pizzaId
    )
    {
        var command = new DeletePizzaItemCommand()
        {
            Id = id,
            CartPizzaId = pizzaId
        };
        var deleteItemDto = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id.ToString());
        
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
    
    [HttpPatch("goods/{id:guid}")]
    public async Task<ActionResult<OrderedGoods>> UpdateGoodsCartItemQuantity(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute] Guid goodsId,
        [FromBody] int quantity
    )
    {
        var command = new UpdateGoodsItemQuantityCommand()
        {
            Id = id,
            CartGoodsId = goodsId,
            NewQuantity = quantity,
        };
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpDelete("goods/{id:guid}")]
    public async Task<ActionResult<DeleteItemDto>> DeleteGoodsCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute] Guid goodsId
    )
    {
        var command = new DeleteGoodsItemCommand()
        {
            Id = id,
            CartGoodsId = goodsId
        };
        var deleteItemDto = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.Id.ToString());
        
        return Ok(deleteItemDto);
    }
}