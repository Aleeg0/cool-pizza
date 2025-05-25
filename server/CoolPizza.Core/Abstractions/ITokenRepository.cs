using CoolPizza.Core.Entities;

namespace CoolPizza.Core.Abstractions;

public interface ITokenRepository
{
    Task<Token> CreateAsync(Guid value, Guid userId);
    Task<Token?> FindByUserIdAsync(Guid id);
    Task<bool> UpdateAsync(Guid id, Guid token);
    Task<bool> DeleteAsync(Guid token);
    Task<Token?> FindByValueAsync(Guid value);
}