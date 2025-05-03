using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Orders;

namespace CoolPizza.Application.Cart.DTOs;

public record GetCartDto
(
    Guid Id,
    List<OrderedPizzaDto> CartPizzaLines,
    List<OrderedGoodsDto> CartGoodsLines,
    decimal TotalAmount
);