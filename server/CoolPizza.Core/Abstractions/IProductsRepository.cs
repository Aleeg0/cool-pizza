using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Projections;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Core.Enums;

namespace CoolPizza.Core.Abstractions;

public interface IProductsRepository
{
    Task<List<MenuProductDto>> GetMenuAllAsync(ProductFiltersDto filtersDto, SortOption sortOption);
    Task<List<SearchedProductDto>> GetSearchedAsync(string searchValue);
    Task<Product?> GetByIdAsync(Guid id);
}