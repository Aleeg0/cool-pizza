using CoolPizza.Core.Abstractions;
using CoolPizza.Infrastructure.Data;
using CoolPizza.Infrastructure.Extensions;
using CoolPizza.Infrastructure.Repositories;
using CoolPizza.Infrastructure.Services;
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
        services.AddScoped<ITokenRepository, TokenRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        // services
        services.AddScoped<IAddressesService, AddressesService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IPasswordService, PasswordService>();
        
        // JWT
        services.AddJwtAuthentication();
        
        return services;
    }
}