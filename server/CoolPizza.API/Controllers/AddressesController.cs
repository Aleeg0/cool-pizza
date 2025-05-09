using CoolPizza.Application.Addresses.DTOs;
using CoolPizza.Application.Addresses.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PizzaService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AddressesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<GetAddressesDto>> GetAddresses([FromQuery] GetAddressesQuery query)
    {
        var result = await mediator.Send(query);
        return Ok(result);
    }
}