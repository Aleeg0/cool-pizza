using CoolPizza.Application.Auth.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Auth.Commands;

public class RegisterCommand : IRequest<AuthDto>
{
    public string Email { get; init; } = null!;
    public string Password { get; init; } = null!;
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? Phone { get; init; }
}

public class RegisterCommandHandler(
    IUnitOfWork unitOfWork,
    IUserRepository userRepository,
    IPasswordService passwordService,
    ITokenService tokenService
) : IRequestHandler<RegisterCommand, AuthDto>
{
    public async Task<AuthDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // потом работаем с ней
        await unitOfWork.BeginTransactionAsync();
        try
        {
            // проверка пользователя на существование
            var candidate = await userRepository.FindByEmailAsync(request.Email);
            if (candidate is not null)
            {
                throw new BadRequestException($"Email {request.Email} already exists");
            }

            // подготовка данных 
            var hashPassword = passwordService.HashPassword(request.Password);

            // создаем пользователя в БД
            var user = await userRepository.CreateAsync(
                request.Email,
                hashPassword,
                request.FirstName,
                request.LastName,
                request.Phone
            );

            // генерируем токены
            var (accessToken, refreshToken) = tokenService.GenerateTokens(user.Id, user.Email);

            // записываем в БД refresh token
            await tokenService.SaveTokenAsync(refreshToken, user.Id);

            
            await unitOfWork.CommitAsync();

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
        catch
        {
            await unitOfWork.RollbackAsync();
            throw;
        }
    }
}