using CoolPizza.Application.Auth.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Auth.Commands;

public class LoginCommand : IRequest<AuthDto>
{
    public string Email { get; init; } = null!;
    public string Password { get; init; } = null!;
}

public class LoginCommandHandler(
    IUserRepository userRepository,
    IPasswordService passwordService,
    ITokenService tokenService
) : IRequestHandler<LoginCommand, AuthDto>
{
    public async Task<AuthDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        // проверка пользователя на существование
        var user = await userRepository.FindByEmailAsync(request.Email);
        if (user is null)
        {
            throw new BadRequestException($"User with email {request.Email} not found");
        }

        if (!passwordService.VerifyPassword(user.Password, request.Password))
        {
            throw new BadRequestException($"Incorrect password");
        }
        
        // генерируем токены
        var (accessToken, refreshToken) = tokenService.GenerateTokens(user.Id, user.Email);

        // записываем в БД refresh token
        await tokenService.SaveTokenAsync(refreshToken, user.Id);

        return new AuthDto
        (
            accessToken,
            refreshToken.ToString(),
            new UserDto(
                user.FirstName,
                user.LastName,
                user.Email,
                user.Phone
            )
        );
    }
}