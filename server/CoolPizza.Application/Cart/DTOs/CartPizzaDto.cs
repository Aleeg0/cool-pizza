namespace CoolPizza.Application.Cart.DTOs;

public record CartPizzaDto
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