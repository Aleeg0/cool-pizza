using CoolPizza.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoolPizza.Infrastructure.Configurations;

public class UserConfig: IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users");
        
        builder.HasKey(o => o.Id);
        
        builder
            .Property(o => o.FirstName)
            .HasColumnName("first_name")
            .HasMaxLength(User.NameMaxLength);
        
        builder
            .Property(o => o.LastName)
            .HasColumnName("last_name")
            .HasMaxLength(User.NameMaxLength);
        
        builder
            .Property(o => o.Email)
            .HasColumnName("email")
            .HasMaxLength(User.EmailMaxLength);

        builder
            .Property(o => o.Password)
            .HasColumnName("password");
        
        builder
            .Property(o => o.Phone)
            .HasColumnName("phone")
            .HasMaxLength(User.PhoneMaxLength);
    }
}