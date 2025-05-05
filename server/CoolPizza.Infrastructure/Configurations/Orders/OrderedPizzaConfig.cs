using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Orders;

public class OrderedPizzaConfig : IEntityTypeConfiguration<OrderedPizza>
{
    public void Configure(EntityTypeBuilder<OrderedPizza> builder)
    {
        builder.ToTable("ordered_pizzas");
        
        builder.HasKey(op => op.Id);

        builder
            .Property(op => op.Quantity)
            .HasColumnName("quantity");
        
        // relations
        
        // relation with Pizza 1:N 
        builder
            .HasOne(op => op.Pizza)
            .WithMany()
            .HasForeignKey(op => op.PizzaId)
            .OnDelete(DeleteBehavior.Restrict);
        
        // relation with Order 1:N
        builder
            .HasOne<Order>()
            .WithMany(o => o.PizzasLine)
            .HasForeignKey(op => op.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}