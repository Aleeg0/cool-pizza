namespace CoolPizza.Core.DTOs.Projections;

public record MenuProductDto
(
    Guid Id,
    string Name,
    string Description,
    string BaseImg,
    decimal BasePrice,
    Guid CategoryId
);