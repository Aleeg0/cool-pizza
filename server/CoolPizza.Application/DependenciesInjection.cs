using Microsoft.Extensions.DependencyInjection;

namespace CoolPizza.Application;

public static class DependenciesInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = typeof(DependenciesInjection).Assembly;
        
        // mediators
        services.AddMediatR(configuration => configuration.RegisterServicesFromAssembly(assembly));

        // validations
        //services.AddValidatorsFromAssembly(assembly);
        
        // auto-mappers
        //services.AddAutoMapper(assembly);
        
        return services;
    }
}