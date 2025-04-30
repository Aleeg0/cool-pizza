using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    { }
    
    public DbSet<Category> Categories { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ApplyBaseEntityConfiguration(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
    
    private static void ApplyBaseEntityConfiguration(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(Entity).IsAssignableFrom(entityType.ClrType))
            {
                modelBuilder.Entity(entityType.ClrType).Property("Id")
                    .HasColumnName("id")
                    .HasDefaultValueSql("gen_random_uuid()")
                    .ValueGeneratedOnAdd();
                
                // Created_at field
                modelBuilder.Entity(entityType.ClrType).Property("CreatedAt")
                    .HasColumnName("create_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .ValueGeneratedOnAdd();
            }
        }
    }
}