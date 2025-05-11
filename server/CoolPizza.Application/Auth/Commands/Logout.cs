using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Auth.Commands;

public class LogoutCommand : IRequest
{
    public string? RefreshToken { get; init; }
}

public class LogoutCommandHandler(ITokenRepository tokenRepository) : IRequestHandler<LogoutCommand>
{
    public async Task Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        if (request.RefreshToken is null)
            throw new BadRequestException("Refresh token not found.");
        
        if (!Guid.TryParse(request.RefreshToken, out var parsedRefreshToken))
            throw new BadRequestException("Invalid refresh token format.");
        
        if (!await tokenRepository.DeleteAsync(parsedRefreshToken))
            throw new NotFoundException(nameof(Token), request.RefreshToken);
    }
}