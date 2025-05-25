using CoolPizza.Application.Auth.Commands;
using CoolPizza.Application.Auth.DTOs;
using CoolPizza.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterCommand command)
    {
        var authDto = await mediator.Send(command);
        
        Response.Cookies.Append(
            "refreshToken", 
            authDto.RefreshToken, 
            new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Token.DefaultExpirationDays),
                //Domain = Environment.GetEnvironmentVariable("CLIENT_DOMAIN")
            }
        );
        
        var result = new AuthResponseDto(authDto.AccessToken, authDto.User);
        
        return Ok(result);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginCommand command)
    {
        var authDto = await mediator.Send(command);
        
        Response.Cookies.Append(
            "refreshToken", 
            authDto.RefreshToken, 
            new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Token.DefaultExpirationDays),
                //Domain = Environment.GetEnvironmentVariable("CLIENT_DOMAIN")
            }
        );
        
        var result = new AuthResponseDto(authDto.AccessToken, authDto.User);
        
        return Ok(result);
    }
    
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        var command = new LogoutCommand() { RefreshToken = Request.Cookies["refreshToken"] };
        await mediator.Send(command);
        
        Response.Cookies.Delete("refreshToken");
        
        return Ok();
    }
    
    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponseDto>> Refresh()
    {
        var command = new RefreshCommand() { RefreshToken = Request.Cookies["refreshToken"] };
        var authDto = await mediator.Send(command);
        
        Response.Cookies.Append(
            "refreshToken", 
            authDto.RefreshToken, 
            new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Token.DefaultExpirationDays),
                //Domain = Environment.GetEnvironmentVariable("CLIENT_DOMAIN")
            }
        );
        
        var result = new AuthResponseDto(authDto.AccessToken, authDto.User);

        return Ok(result);
    }
}