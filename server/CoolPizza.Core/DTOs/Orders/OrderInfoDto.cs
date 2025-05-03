using CoolPizza.Core.Entities.Orders;

namespace CoolPizza.Core.DTOs.Orders;

public record OrderInfoDto
(
    Order Order,
    List<OrderedPizzaDto> CartPizzaLines,
    List<OrderedGoodsDto> CartGoodsLines
);