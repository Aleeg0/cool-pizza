namespace CoolPizza.Application.Cart.DTOs;

public record CartItemDto
(
    Guid Id,
    string Name,
    string Details,
    string ImgUrl,
    decimal Price,
    int Quantity,
    string? AddedIngredientsLine = null
);