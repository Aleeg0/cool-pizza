using CoolPizza.Core.Entities;

namespace CoolPizza.Core.Abstractions;

public interface ICategoriesRepository
{
    Task<List<Category>> GetAllAsync();

    Task<Category> CreateAsync(string name, string value);
}
