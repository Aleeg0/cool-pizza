using CoolPizza.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations;

public class CategoryConfig: IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("categories");
        
        builder.HasKey(c => c.Id);

        builder
            .Property(c => c.Name)
            .HasColumnName("name")
            .HasMaxLength(Category.NameMaxLength);
        
        builder
            .Property(c => c.Value)
            .HasColumnName("value")
            .HasMaxLength(Category.ValueMaxLength);
        
        
    }
}