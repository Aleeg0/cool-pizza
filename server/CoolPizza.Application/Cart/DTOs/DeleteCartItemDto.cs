namespace CoolPizza.Application.Cart.DTOs;

public record DeleteCartItemDto(
    Guid Id,
    decimal TotalAmount
);