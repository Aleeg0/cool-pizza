using CoolPizza.Core.Entities.Products;
using CoolPizza.Core.Enums;

namespace CoolPizza.Application.Products.DTOs;

public record ProductWithVariationsDto
(
    Guid Id,
    string Name,
    string Description,
    string BaseImg,
    decimal BasePrice,
    ProductType ProductType,
    DateTime CreatedAt,
    Guid CategoryId,
    List<Variation> Variations
);