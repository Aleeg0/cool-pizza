namespace CoolPizza.Application.Auth.DTOs;

public record UserDto
(
    string? FirstName,
    string? LastName,
    string? Email,
    string? Phone
);