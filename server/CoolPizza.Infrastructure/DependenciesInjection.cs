using CoolPizza.Core.Abstractions;
using CoolPizza.Infrastructure.Data;
using CoolPizza.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CoolPizza.Infrastructure;

public static class DependenciesInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(option => option.UseNpgsql(connectionString));
        
        // repository
        services.AddScoped<IProductsRepository, ProductsRepository>();
        services.AddScoped<ICategoriesRepository, CategoriesRepository>();
        services.AddScoped<IIngredientsRepository, IngredientsRepository>();
        services.AddScoped<IGoodsRepository, GoodsRepository>();
        services.AddScoped<IPizzasRepository, PizzasRepository>();
        services.AddScoped<IOrdersRepository, OrdersRepository>();
        services.AddScoped<IOrderedGoodsRepository, OrderedGoodsRepository>();
        services.AddScoped<IOrderedPizzasRepository, OrderedPizzasRepository>();
        services.AddScoped<IUnitOfWork, EfUnitOfWork>();
        
        return services;
    }
}