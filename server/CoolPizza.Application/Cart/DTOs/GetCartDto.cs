
namespace CoolPizza.Application.Cart.DTOs;

public record GetCartDto
(
    List<CartPizzaDto> PizzaCartLines,
    List<CartGoodsDto> GoodsCartLines,
    decimal TotalAmount
);