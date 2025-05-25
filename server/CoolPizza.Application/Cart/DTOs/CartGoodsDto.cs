namespace CoolPizza.Application.Cart.DTOs;

public record CartGoodsDto
(
    Guid Id,
    string Name,
    string ImgUrl,
    decimal Price,
    int Quantity,
    string Details
);