using CoolPizza.Core.DTOs.Projections;
using CoolPizza.Core.Entities;

namespace CoolPizza.Application.Products.DTOs;

public record MenuProductsDto
(
    Category Category,
    List<MenuProductDto> MenuProducts
);

