namespace CoolPizza.Application.Cart.DTOs;

public record CreateCartGoodsDto
(
    decimal TotalAmount,
    CartGoodsDto CartGoods
);