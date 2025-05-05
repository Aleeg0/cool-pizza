namespace CoolPizza.Core.Projections;

public record SearchedProductProjection
(
    Guid Id,
    string Name,
    string BaseImg
);