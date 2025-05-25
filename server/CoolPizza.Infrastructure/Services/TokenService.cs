using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs;
using CoolPizza.Core.Entities;
using Microsoft.IdentityModel.Tokens;

namespace CoolPizza.Infrastructure.Services;

public class TokenService(ITokenRepository tokenRepository) : ITokenService
{
    private readonly string _secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY")!;
    private readonly string _issuer = Environment.GetEnvironmentVariable("JWT_ISSUER")!;
    private readonly string _audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE")!;
    
    public (string accessToken, Guid refreshToken) GenerateTokens(Guid userId, string email)
    {
        // Генерация Access Token
        var accessToken = GenerateAccessToken(userId.ToString(), email);

        // Генерация Refresh Token (можно добавить дополнительные claims или информацию)
        var refreshToken = GenerateRefreshToken();

        return (accessToken, refreshToken);
    }

    public async Task<Guid?> ValidateTokenAsync(Guid value)
    {
        var token = await tokenRepository.FindByValueAsync(value);
        if (token is null)
            return null;
        
        if (token.CreatedAt.AddDays(Token.DefaultExpirationDays) < DateTime.UtcNow)
            return null;

        return token.UserId;
    }

    public async Task SaveTokenAsync(Guid refreshToken, Guid userId)
    {
        var token = await tokenRepository.FindByUserIdAsync(userId);

        if (token is not null)
            await tokenRepository.DeleteAsync(token.Id);
        
        await tokenRepository.CreateAsync(refreshToken, userId);
    }

    private string GenerateAccessToken(string userId, string email)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId),
            new(ClaimTypes.Email, email)
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    private Guid GenerateRefreshToken()
    {
        var refreshToken = Guid.NewGuid();
        return refreshToken;
    }
}