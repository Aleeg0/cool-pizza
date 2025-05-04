namespace CoolPizza.Core.Projections;

public record MenuProductProjection
(
    Guid Id,
    string Name,
    string Description,
    string BaseImg,
    decimal BasePrice,
    Guid CategoryId
);