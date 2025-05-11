using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<User?> FindByEmailAsync(string email) =>
        await context.Users
            .Where(u => u.Email == email)
            .FirstOrDefaultAsync();

    public async Task<User> CreateAsync(
        string email, 
        string hashPassword, 
        string? firstName, 
        string? lastName, 
        string? phone
    ) {
        User user = User.Create(email, hashPassword, firstName, lastName, phone);
        
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        
        return user;
    }

    public async Task<User?> FindByIdAsync(Guid id) =>
        await context.Users.FindAsync(id);

}