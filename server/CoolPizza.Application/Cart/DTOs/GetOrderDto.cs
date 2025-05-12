namespace CoolPizza.Application.Cart.DTOs;

public record GetOrderDto
(
    Guid Id,
    decimal TotalAmount,
    DateTime OrderedAt,
    List<CartItemDto> PizzaCartLines,
    List<CartItemDto> GoodsCartLines
);