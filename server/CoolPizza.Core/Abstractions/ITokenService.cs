namespace CoolPizza.Core.Abstractions;

public interface ITokenService
{
    (string accessToken, Guid refreshToken) GenerateTokens(Guid userId, string email);
    Task<Guid?> ValidateTokenAsync(Guid token);
    Task SaveTokenAsync(Guid refreshToken, Guid userId);
}