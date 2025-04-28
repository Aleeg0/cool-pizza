namespace CoolPizza.Core.Entities;

public class PizzaProduct: Entity
{
    public string ImgUrl { get; private set; }
    public decimal Price { get; private set; }
    public int Size {get; private set;}
    public string Dough { get; private set; }
    public double? Weight { get; private set; }
    public Product Product { get; private set; }
}