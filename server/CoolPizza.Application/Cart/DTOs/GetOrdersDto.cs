namespace CoolPizza.Application.Cart.DTOs;

public record GetOrdersDto
(
    List<GetOrderDto> Orders
);