using CoolPizza.Core.DTOs;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Core.Enums;
using CoolPizza.Core.Projections;

namespace CoolPizza.Core.Abstractions;

public interface IProductsRepository
{
    Task<List<MenuProductProjection>> GetMenuAllAsync(ProductFiltersDto filtersDto, SortOption sortOption);
    Task<List<CartProductProjection>> GetCartProjectionRangeAsync(ICollection<Guid> productsIds);
    Task<List<SearchedProductProjection>> GetSearchedAsync(string searchValue);
    Task<Product?> GetByIdAsync(Guid id);
    Task<Product?> FindByIdAsync(Guid id);
}