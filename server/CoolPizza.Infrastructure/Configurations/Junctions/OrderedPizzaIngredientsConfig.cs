using CoolPizza.Core.Entities.Junctions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Junctions;

public class OrderedPizzaIngredientsConfig: IEntityTypeConfiguration<OrderedPizzaIngredients>
{
    public void Configure(EntityTypeBuilder<OrderedPizzaIngredients> builder)
    {
        builder
            .HasKey(opi => new { PizzaId = opi.OrderedPizzaId, opi.IngredientId });
        
        builder
            .Property(opi => opi.OrderedPizzaId)
            .HasColumnName("ordered_pizza_id");
        
        builder
            .Property(opi => opi.IngredientId)
            .HasColumnName("ingredient_id");
    }
}