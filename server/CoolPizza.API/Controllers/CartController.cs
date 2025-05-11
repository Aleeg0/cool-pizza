using CoolPizza.Application.Cart.Commands;
using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Cart.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController(IMediator mediator) : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetCartDto>> GetCartById(
        [FromRoute(Name = "id")] Guid id
    )
    {
        var query = new GetCartByIdQuery()
        {
            Id = id
        };
        var cartInfo = await mediator.Send(query);
        return Ok(cartInfo);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult> UpdateCartById(
        [FromRoute(Name = "id")] Guid id,
        [FromBody] UpdateOrderCommand command
    )
    {
        command.UserId = (Guid?)HttpContext.Items["UserId"];
        command.Id = id;
        var cart = await mediator.Send(command);
        return Ok(cart);
    }
    
    [HttpGet("total-amount")]
    public async Task<ActionResult<GetTotalAmountDto>> GetTotalAmount(
        [FromHeader(Name = "X-Cart-Token")] Guid id
    )
    {
        var query = new GetCartTotalAmountByIdQuery()
        {
            Id = id
        };
        var cartInfo = await mediator.Send(query);
        return Ok(cartInfo);
    }
    
    [HttpPost("pizzas")]
    public async Task<ActionResult<CartItemDto>> CreatePizzaCartItem(
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
    public async Task<ActionResult<UpdateCartItemQuantityDto>> UpdatePizzaCartItemQuantity(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute(Name = "id")] Guid pizzaId,
        [FromBody] UpdateQuantityRequest body
    )
    {
        var command = new UpdatePizzaItemQuantityCommand()
        {
            CartId = id,
            CartPizzaId = pizzaId,
            NewQuantity = body.Quantity,
        };
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.CartId.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpDelete("pizzas/{id:guid}")]
    public async Task<ActionResult<DeleteCartItemDto>> DeletePizzaCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute(Name = "id")] Guid pizzaId
    )
    {
        var command = new DeletePizzaItemCommand()
        {
            CartId = id,
            CartPizzaId = pizzaId
        };
        await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.CartId.ToString());
        
        return Ok();
    }
    
    [HttpPost("goods")]
    public async Task<ActionResult<CartItemDto>> CreateGoodsCartItem(
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
    public async Task<ActionResult<UpdateCartItemQuantityDto>> UpdateGoodsCartItemQuantity(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute(Name = "id")] Guid goodsId,
        [FromBody] UpdateQuantityRequest body
    )
    {
        var command = new UpdateGoodsItemQuantityCommand()
        {
            CartId = id,
            CartGoodsId = goodsId,
            NewQuantity = body.Quantity,
        };
        var cartInfo = await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.CartId.ToString());
        
        return Ok(cartInfo);
    }
    
    [HttpDelete("goods/{id:guid}")]
    public async Task<ActionResult<DeleteCartItemDto>> DeleteGoodsCartItem(
        [FromHeader(Name = "X-Cart-Token")] Guid id,
        [FromRoute(Name = "id")] Guid goodsId
    )
    {
        var command = new DeleteGoodsItemCommand()
        {
            CartId = id,
            CartGoodsId = goodsId
        };
        await mediator.Send(command);
        
        // Добавляем куку в ответ
        Response.Headers.Append("X-Cart-Token", command.CartId.ToString());
        
        return Ok();
    }
}