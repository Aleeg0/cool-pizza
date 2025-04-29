using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Junctions;
using CoolPizza.Core.Entities.Products;
using CoolPizza.Core.Entities.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations;

public class IngredientConfig: IEntityTypeConfiguration<Ingredient>
{
    public void Configure(EntityTypeBuilder<Ingredient> builder)
    {
        builder.ToTable("ingredients");
        
        builder.HasKey(c => c.Id);
        builder
            .Property(c => c.Id)
            .HasColumnName("id")
            .HasDefaultValueSql("gen_random_uuid()")
            .ValueGeneratedOnAdd();
        
        builder
            .Property(g => g.Name)
            .HasMaxLength(Ingredient.MaxNameLength)
            .HasColumnName("name");
        
        builder
            .Property(g => g.ImgUrl)
            .HasColumnName("img_url");

        builder
            .Property(g => g.Price)
            .HasColumnName("price")
            .HasColumnType("decimal(5,2)");
        
        // relation with Pizzas
        builder
            .HasMany(i => i.Pizzas)
            .WithMany(p => p.Ingredients)
            .UsingEntity<PizzaIngredients>(
                right => right
                    .HasOne<Pizza>()
                    .WithMany()
                    .HasForeignKey(pi => pi.PizzaId),
                left => left
                    .HasOne<Ingredient>()
                    .WithMany()
                    .HasForeignKey(pi => pi.IngredientId),
                join => join
                    .ToTable("pizza_ingredients")
            );
        
        // relation with OrderedPizzas
        builder
            .HasMany(i => i.OrderedPizzas)
            .WithMany(p => p.Ingredients)
            .UsingEntity<OrderedPizzaIngredients>(
                right => right
                    .HasOne<OrderedPizza>()
                    .WithMany()
                    .HasForeignKey(opi => opi.OrderedPizzaId),
                left => left
                    .HasOne<Ingredient>()
                    .WithMany()
                    .HasForeignKey(opi => opi.IngredientId),
                join => join
                    .ToTable("ordered_pizza_ingredients")
            );
    }
}