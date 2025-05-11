using CoolPizza.Core.Entities;

namespace CoolPizza.Core.Abstractions;

public interface IUserRepository
{
    Task<User?> FindByEmailAsync(string email);
    Task<User> CreateAsync(
        string email, 
        string hashPassword,
        string? firstName,
        string? lastName,
        string? phone
    );

    Task<User?> FindByIdAsync(Guid id);
}