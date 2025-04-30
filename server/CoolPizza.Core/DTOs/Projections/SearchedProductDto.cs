namespace CoolPizza.Core.DTOs.Projections;

public record SearchedProductDto
(
    Guid Id,
    string Name,
    string BaseImg
);