using CoolPizza.Core.Entities;

namespace CoolPizza.Core.Abstractions;

public interface ICategoriesRepository
{
    Task<List<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(Guid id);
    Task<Category> CreateAsync(string name, string value);
    Task<Category?> UpdateById(Guid id, string? name, string? value);
    Task<bool> DeleteById(Guid id);
}
