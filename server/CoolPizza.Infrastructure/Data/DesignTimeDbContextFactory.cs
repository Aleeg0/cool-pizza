using CoolPizza.Infrastructure.Data;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CoolPizza.Infrastructure.Data;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        // Загрузка .env (путь относительно папки Infrastructure)
        string dotEnvPath = Path.Combine("..", "CoolPizza.API", ".env");
        Env.Load(dotEnvPath);
        
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        
        optionsBuilder.UseNpgsql(
            $"Host={Env.GetString("DB_HOST")};" +
            $"Database={Env.GetString("DB_NAME")};" +
            $"User Id={Env.GetString("DB_USER")};" +
            $"Password={Env.GetString("DB_PASSWORD")};"
        );
        
        return new ApplicationDbContext(optionsBuilder.Options);
    }
}