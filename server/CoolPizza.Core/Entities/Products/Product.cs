using CoolPizza.Core.Enums;

namespace CoolPizza.Core.Entities.Products;

public class Product: Entity
{
    public const int NameMaxLength = 128;
    
    public string Name { get; private set; }
    public string Description { get; private set; }
    public string BaseImg { get; private set; }
    public string BasePrice { get; private set; }
    public ProductType Type { get; private set; }
    public Guid CategoryId { get; private set;}
    public ICollection<Goods> Goods { get; private set; }
    public ICollection<Pizza> Pizzas { get; private set; }
}