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

    public async Task<Category> CreateAsync(string name, string value)
    {
        Category category = Category.Create(name, value);
        await context.Categories.AddAsync(category);
        await context.SaveChangesAsync();
        return category;
    }
}