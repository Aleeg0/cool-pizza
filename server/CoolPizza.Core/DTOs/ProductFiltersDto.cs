namespace CoolPizza.Core.DTOs;

public record ProductFiltersDto
(
  List<Guid> IngredientsIds,
  decimal? MinPrice,
  decimal? MaxPrice
);