using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations.Products;

public class ProductConfig: IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("products");
        
        builder.HasKey(p => p.Id);
        builder
            .Property(p => p.Id)
            .HasColumnName("id")
            .HasDefaultValueSql("gen_random_uuid()")
            .ValueGeneratedOnAdd();

        builder
            .Property(p => p.Name)
            .HasColumnName("name")
            .HasMaxLength(Product.NameMaxLength);
        
        builder
            .Property(p => p.Description)
            .HasColumnName("description");

        builder
            .Property(p => p.BaseImg)
            .HasColumnName("base_img");
        
        builder
            .Property(p => p.BasePrice)
            .HasColumnName("base_price")
            .HasColumnType("decimal(5,2)");
        
        builder
            .Property(p => p.Type)
            .HasColumnName("type");
        
        builder
            .Property(p => p.CategoryId)
            .HasColumnName("category_id");
        
        // indexes
        builder
            .HasIndex(p => p.Name)
            .IsUnique();
        
        // relation with category 1:N
        builder
            .HasOne<Category>()
            .WithMany(p => p.Products)
            .HasForeignKey(p => p.CategoryId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);
    }
}