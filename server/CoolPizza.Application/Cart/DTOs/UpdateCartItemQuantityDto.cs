namespace CoolPizza.Application.Cart.DTOs;

public record UpdateCartItemQuantityDto
(
    Guid Id,
    int Quantity
);