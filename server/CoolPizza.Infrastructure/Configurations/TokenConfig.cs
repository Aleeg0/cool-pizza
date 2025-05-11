using CoolPizza.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations;

public class TokenConfig : IEntityTypeConfiguration<Token>
{
    public void Configure(EntityTypeBuilder<Token> builder)
    {
        builder.ToTable("tokens");
        
        builder.HasKey(t => t.Id);

        builder
            .Property(t => t.Value)
            .HasColumnName("value");
        
        builder
            .Property(t => t.UserId)
            .HasColumnName("user_id");
        
        // relation with user
        builder
            .HasOne<User>()
            .WithOne()
            .HasForeignKey<Token>(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}