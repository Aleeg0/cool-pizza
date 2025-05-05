
namespace CoolPizza.Application.Cart.DTOs;

public record GetCartDto
(
    List<CartItemDto> PizzaCartLines,
    List<CartItemDto> GoodsCartLines,
    decimal TotalAmount
);