using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Entities;

public class Category : Entity
{
    public const int NameMaxLength = 64;
    public const int ValueMaxLength = 64;
    
    public string Name { get; private set; }
    public string Value { get; private set; }
    public ICollection<Product> Products { get; private set; }    
}