namespace CoolPizza.Core.DTOs.Orders;

public record OrderedPizzaDto
(
    Guid Id,
    string Name,
    string ImgUrl,
    decimal Price,
    int Quantity,
    int Size,
    string Dough,
    List<string> IngredientsNames
);