﻿using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Orders;
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
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<Goods> Goods { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderedGoods> OrderedGoods { get; set; }
    public DbSet<OrderedPizza> OrderedPizzas { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Token> Tokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        ApplyBaseEntityConfiguration(modelBuilder);
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
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .ValueGeneratedOnAdd();
            }
        }
    }
}