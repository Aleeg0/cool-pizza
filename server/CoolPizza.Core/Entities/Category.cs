namespace CoolPizza.Core.Entities;

public class Category : Entity
{
    public string Name { get; private set; }
    public string Value { get; private set; }
    public ICollection<Product> Products { get; private set; }    
}