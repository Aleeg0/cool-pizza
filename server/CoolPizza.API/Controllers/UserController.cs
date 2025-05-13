using CoolPizza.Application.User.Commands;
using CoolPizza.Application.User.DTOs;
using CoolPizza.Application.User.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var query = new GetUserQuery()
        {
            UserId = (Guid?)HttpContext.Items["UserId"]
        };
        var user = await mediator.Send(query);
        return Ok(user);
    }
    
    [HttpPut]
    public async Task<ActionResult<UserDto>> Put([FromBody] UpdateUserCommand command)
    {
        command.Id = (Guid?)HttpContext.Items["UserId"];
        var result = await mediator.Send(command);
        return Ok(result);
    }
}