namespace CoolPizza.Core.DTOs.Orders;

public record OrderedGoodsDto
(
    Guid Id,
    string Name,
    string ImgUrl,
    decimal Price,
    int Quantity,
    string Details
);