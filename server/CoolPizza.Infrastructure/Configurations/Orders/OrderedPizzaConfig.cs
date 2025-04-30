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
        
        builder
            .Property(op => op.OrderId)
            .HasColumnName("order_id");
        
        // relations
        
        // relation with Pizza 1:N 
        builder
            .HasOne<Pizza>()
            .WithMany()
            .HasForeignKey(op => op.PizzaId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // relation with Order 1:N
        builder
            .HasOne<Order>()
            .WithMany(o => o.PizzasLine)
            .HasForeignKey(op => op.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}