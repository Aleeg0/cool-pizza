using CoolPizza.Core.Enums;

namespace CoolPizza.Core.Entities;

public class Product: Entity
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public string baseImg { get; private set; }
    public string basePrice { get; private set; }
    public ProductType Type { get; private set; }
    public Category Category { get; private set;}
    public ICollection<RegularProduct> RegularProducts { get; private set; }
    public ICollection<PizzaProduct> PizzaProducts { get; private set; }
}