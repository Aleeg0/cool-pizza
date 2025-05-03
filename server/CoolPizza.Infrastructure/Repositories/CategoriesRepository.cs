using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class CategoriesRepository(ApplicationDbContext context) : ICategoriesRepository
{
    public async Task<List<Category>> GetAllAsync()
    {
        return await context.Categories.ToListAsync();
    }
    
    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await context.Categories.FindAsync(id);
    }

    public async Task<Category> CreateAsync(string name, string value)
    {
        Category category = Category.Create(name, value);
        
        await context.Categories.AddAsync(category);
        
        await context.SaveChangesAsync();
        
        return category;
    }

    public async Task<bool> DeleteById(Guid id)
    {
        var rowsAffected = await context.Categories
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync();

        return rowsAffected > 0;
    }

    public async Task<Category?> UpdateById(Guid id, string? name, string? value)
    {
        var category = await context.Categories.FindAsync(id);
        
        if (category is null)
            return null;   
        
        category.Update(name, value);
        
        await context.SaveChangesAsync();
        
        return category;
    }
}