using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Orders;

public class OrderConfig: IEntityTypeConfiguration<Order>
{
    
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("orders");
        
        builder.HasKey(o => o.Id);
        
        builder
            .Property(o => o.Name)
            .HasColumnName("name")
            .HasMaxLength(Order.UserPropertiesMaxLength);
        
        builder
            .Property(o => o.Email)
            .HasColumnName("email")
            .HasMaxLength(Order.UserPropertiesMaxLength);
        
        builder
            .Property(o => o.Phone)
            .HasColumnName("phone")
            .HasMaxLength(Order.PhoneMaxLength);
        
        builder
            .Property(o => o.Address)
            .HasColumnName("address")
            .HasMaxLength(Order.AddressMaxLength);
        
        builder
            .Property(o => o.TotalAmount)
            .HasColumnName("total_amount")
            .HasColumnType("decimal(18,2)");

        builder
            .Property(o => o.Status)
            .HasColumnName("status");

        builder
            .Property(o => o.DeliveryType)
            .HasColumnName("delivery_type");

        builder
            .Property(o => o.PaidAt)
            .HasColumnName("paid_at");

        builder
            .Property(o => o.UserId)
            .HasColumnName("user_id");
        
        // relation with user 1:N
        builder
            .HasOne<User>()
            .WithMany(o => o.Orders)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
