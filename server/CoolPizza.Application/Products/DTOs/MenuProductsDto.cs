using CoolPizza.Core.Entities;
using CoolPizza.Core.Projections;

namespace CoolPizza.Application.Products.DTOs;

public record MenuProductsDto
(
    Category Category,
    List<MenuProductProjection> Products
);

