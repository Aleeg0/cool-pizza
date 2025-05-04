namespace CoolPizza.Application.Cart.DTOs;

public record CreateCartPizzaDto
(
    decimal TotalAmount,
    CartPizzaDto CartPizza
);