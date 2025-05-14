using CoolPizza.Application.Auth.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Application.User.DTOs;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Auth.Commands;

public class RefreshCommand : IRequest<AuthDto>
{
    public string? RefreshToken { get; init; }
}

public class RefreshCommandHandler(
    ITokenRepository tokenRepository,
    IUserRepository userRepository,  
    ITokenService tokenService
) : IRequestHandler<RefreshCommand, AuthDto>
{
    public async Task<AuthDto> Handle(RefreshCommand request, CancellationToken cancellationToken)
    {
        // проверка токена
        if (request.RefreshToken is null)
            throw new UnauthorizedException("Refresh token not found.");
        
        if (!Guid.TryParse(request.RefreshToken, out var parsedRefreshToken))
            throw new UnauthorizedException("Invalid refresh token format.");

        // поиск в БД
        var token = await tokenRepository.FindByValueAsync(parsedRefreshToken);
        
        if (token is null)
            throw new UnauthorizedException("Refresh token not found.");

        // валидация токена
        var userId = await tokenService.ValidateTokenAsync(parsedRefreshToken);
        
        if (userId is null)
            throw new UnauthorizedException("Invalid refresh token.");

        // после всех проверок возвращаем данные
        var user = await userRepository.FindByIdAsync(userId.Value);
        
        if (user is null)
            throw new NotFoundException("User not found.");
        
        // записываем в БД refresh token
        var (accessToken, refreshToken) = tokenService.GenerateTokens(user.Id, user.Email);
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