using CoolPizza.Application.User.DTOs;

namespace CoolPizza.Application.Auth.DTOs;

public record AuthResponseDto
(
    string AccessToken,
    UserDto User
);