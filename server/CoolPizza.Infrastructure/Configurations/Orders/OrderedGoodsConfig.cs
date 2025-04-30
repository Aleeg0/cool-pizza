using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Orders;

public class OrderedGoodsConfig : IEntityTypeConfiguration<OrderedGoods>
{
    public void Configure(EntityTypeBuilder<OrderedGoods> builder)
    {
        builder.ToTable("ordered_goods");
        
        builder.HasKey(og => og.Id);

        builder
            .Property(og => og.Quantity)
            .HasColumnName("quantity");
        
        builder
            .Property(og => og.GoodsId)
            .HasColumnName("goods_id");

        builder
            .Property(og => og.OrderId)
            .HasColumnName("order_id");
        
        // relations
        
        // relation with Goods 1:N 
        builder
            .HasOne<Goods>()
            .WithOne()
            .HasForeignKey<OrderedGoods>(og => og.GoodsId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // relation with Order 1:N 
        builder
            .HasOne<Order>()
            .WithMany(o => o.GoodsLine)
            .HasForeignKey(og => og.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}