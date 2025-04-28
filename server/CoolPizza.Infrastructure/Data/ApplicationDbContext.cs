using CoolPizza.Core.Entities;
using CoolPizza.Infrastructure.Data.Tools;
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
        
        // изменяем code style для сущностей на SneakCase
        ToSneakCaseAllEntities(modelBuilder);
    }

    private void ToSneakCaseAllEntities(ModelBuilder modelBuilder)
    {
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            // Переименование таблиц
            entity.SetTableName(CaseMapper.ToSnakeCase(entity.GetTableName()));

            // Переименование всех колонок
            foreach (var property in entity.GetProperties())
            {
                property.SetColumnName(CaseMapper.ToSnakeCase(property.Name));
            }

            // Переименование ключей
            foreach (var key in entity.GetKeys())
            {
                key.SetName(CaseMapper.ToSnakeCase(key.GetName()));
            }

            // Переименование индексов
            foreach (var index in entity.GetIndexes())
            {
                index.SetDatabaseName(CaseMapper.ToSnakeCase(index.GetDatabaseName()));
            }

            // Переименование внешних ключей
            foreach (var foreignKey in entity.GetForeignKeys())
            {
                foreignKey.SetConstraintName(CaseMapper.ToSnakeCase(foreignKey.GetConstraintName()));
            }
        }
    }
}