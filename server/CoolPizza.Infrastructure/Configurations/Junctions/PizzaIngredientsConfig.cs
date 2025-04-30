using CoolPizza.Core.Entities.Junctions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Junctions;

public class PizzaIngredientsConfig: IEntityTypeConfiguration<PizzaIngredients>
{
    public void Configure(EntityTypeBuilder<PizzaIngredients> builder)
    {
        builder
            .HasKey(opi => new { opi.PizzaId, opi.IngredientId });
        
        builder
            .Property(opi => opi.PizzaId)
            .HasColumnName("pizza_id");
        
        builder
            .Property(opi => opi.IngredientId)
            .HasColumnName("ingredient_id");
    }
}