using CoolPizza.Application.User.DTOs;

namespace CoolPizza.Application.Auth.DTOs;

public record AuthDto
(
    string AccessToken,
    string RefreshToken,
    UserDto User
);
