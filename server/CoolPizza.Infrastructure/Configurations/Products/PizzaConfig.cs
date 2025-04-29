using CoolPizza.Core.Entities.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Products;

public class PizzaConfig: IEntityTypeConfiguration<Pizza>
{
    public void Configure(EntityTypeBuilder<Pizza> builder)
    {
        builder.ToTable("pizzas");
        
        builder.HasKey(p => p.Id);
        builder
            .Property(p => p.Id)
            .HasColumnName("id")
            .HasDefaultValueSql("gen_random_uuid()")
            .ValueGeneratedOnAdd();
        
        builder
            .Property(p => p.ImgUrl)
            .HasColumnName("img_url");

        builder
            .Property(p => p.Price)
            .HasColumnName("price")
            .HasColumnType("decimal(5,2)");;
        
        builder
            .Property(p => p.Size)
            .HasColumnName("size");
        
        builder
            .Property(p => p.Dough)
            .HasColumnName("dough")
            .HasMaxLength(Pizza.DoughMaxLength);
        
        builder
            .Property(p => p.Weight)
            .HasColumnName("weight");
        
        builder
            .Property(p => p.ProductId)
            .HasColumnName("product_id");
        
        // relation with product 1:N
        builder
            .HasOne<Product>()
            .WithMany(p => p.Pizzas)
            .HasForeignKey(p => p.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}