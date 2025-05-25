using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Entities;

public class Category : Entity
{
    public const int NameMaxLength = 64;
    public const int NameMinLength = 3;
    public const int ValueMaxLength = 64;
    public const int ValueMinLength = 3;
    
    public string Name { get; private set; }
    public string Value { get; private set; }
    public ICollection<Product> Products { get; private set; } = [];

    private Category(string name, string value)
    {
        Name = name;
        Value = value;
    }

    public static Category Create(string name, string value)
    {
        if (name.Length < NameMinLength || name.Length > NameMaxLength)
        {
            throw new ArgumentException($"Property name must be between {NameMinLength} and {NameMaxLength} characters long.");
        }
        
        if (value.Length < ValueMinLength || value.Length > ValueMaxLength)
        {
            throw new ArgumentException($"Property value must be between {ValueMinLength} and {ValueMaxLength} characters long.");
        }
        
        return new Category(name, value);
    }

    public void Update(string? name, string? value)
    {
        if (name is not null)
        {
            if (name.Length < NameMinLength || name.Length > NameMaxLength)
                throw new ArgumentException($"Property name must be between {NameMinLength} and {NameMaxLength} characters long.");
            Name = name;
        }

        if (value is not null)
        {
            if (value.Length < ValueMinLength || value.Length > ValueMaxLength)
            {
                throw new ArgumentException($"Property value must be between {ValueMinLength} and {ValueMaxLength} characters long.");
            }

            Value = value;
        }
    }
}