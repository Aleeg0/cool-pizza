namespace CoolPizza.Core.Entities;

public class RegularProduct: Entity
{
    public string ImgUrl { get; private set; }
    public decimal Price { get; private set; }
    public string Details { get; private set; }
    public double? Weight { get; private set; }
    public Product Product { get; private set; }
}