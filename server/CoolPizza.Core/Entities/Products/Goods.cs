namespace CoolPizza.Core.Entities.Products;

public class Goods: Variation
{
    public string Details { get; private set; }
    public double? Weight { get; private set; }
}