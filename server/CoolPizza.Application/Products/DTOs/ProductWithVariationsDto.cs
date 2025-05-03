namespace CoolPizza.Application.Products.DTOs;

public record ProductWithVariationsDto
(
    Guid Id,
    string Name,
    string Description,
    string BaseImg,
    decimal BasePrice,
    string Type,
    DateTime CreatedAt,
    Guid CategoryId,
    List<object> Variations
);