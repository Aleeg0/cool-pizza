namespace CoolPizza.Application.User.DTOs;

public record UserDto
(
    string? FirstName,
    string? LastName,
    string? Email,
    string? Phone
);