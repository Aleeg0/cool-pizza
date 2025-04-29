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
            .Property(og => og.Id)
            .HasColumnName("id")
            .HasDefaultValueSql("gen_random_uuid()")
            .ValueGeneratedOnAdd();

        builder
            .Property(og => og.Quantity)
            .HasColumnType("quantity");
        
        builder
            .Property(og => og.GoodsId)
            .HasColumnType("goods_id");

        builder
            .Property(og => og.OrderId)
            .HasColumnType("order_id");
        
        // relations
        
        // relation with Goods 1:N 
        builder
            .HasOne<Goods>()
            .WithMany()
            .HasForeignKey(og => og.GoodsId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // relation with Order 1:N 
        builder
            .HasOne<Order>()
            .WithMany()
            .HasForeignKey(og => og.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}