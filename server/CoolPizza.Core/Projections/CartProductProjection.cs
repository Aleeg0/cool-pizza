namespace CoolPizza.Core.Projections;

public record CartProductProjection
(
    Guid Id,
    string Name,
    string BaseImg
);