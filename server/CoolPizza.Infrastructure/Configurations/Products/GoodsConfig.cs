using CoolPizza.Core.Entities.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Products;

public class GoodsConfig: IEntityTypeConfiguration<Goods>
{
    public void Configure(EntityTypeBuilder<Goods> builder)
    {
        builder.ToTable("goods");
        
        builder.HasKey(g => g.Id);
        
        builder
            .Property(g => g.ImgUrl)
            .HasColumnName("img_url");

        builder
            .Property(g => g.Price)
            .HasColumnName("price")
            .HasColumnType("decimal(5,2)");
        
        builder
            .Property(g => g.Details)
            .HasColumnName("details");
        
        builder
            .Property(g => g.Weight)
            .HasColumnName("weight");
        
        builder
            .Property(g => g.ProductId)
            .HasColumnName("product_id");
        
        builder
            .HasOne<Product>()
            .WithMany(g => g.Goods)
            .HasForeignKey(g => g.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}