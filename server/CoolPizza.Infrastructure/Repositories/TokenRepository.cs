using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class TokenRepository(ApplicationDbContext context) : ITokenRepository
{
    public async Task<Token> CreateAsync(Guid value, Guid userId)
    {
        var token = new Token(value, userId);
        
        await context.Tokens.AddAsync(token);
        await context.SaveChangesAsync();

        return token;
    }

    public async Task<Token?> FindByUserIdAsync(Guid id) =>
        await context.Tokens
            .Where(t => t.UserId == id)
            .FirstOrDefaultAsync();

    public async Task<bool> UpdateAsync(Guid id, Guid token)
    {
        var rowAffects = await context.Tokens
            .Where(t => t.Id == id)
            .ExecuteUpdateAsync(s =>
                s.SetProperty(t => t.Value, token)
            );
        
        return rowAffects > 0;
    }

    public async Task<bool> DeleteAsync(Guid token)
    {
        var rowAffects = await context.Tokens
            .Where(t => t.Value == token)
            .ExecuteDeleteAsync();
        
        return rowAffects > 0;
    }

    public async Task<Token?> FindByValueAsync(Guid value) =>
        await context.Tokens
            .Where(t => t.Value == value)
            .FirstOrDefaultAsync();
}