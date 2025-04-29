namespace CoolPizza.Core.Entities.Products;

public class Goods: Entity
{
    public string ImgUrl { get; private set; }
    public decimal Price { get; private set; }
    public string Details { get; private set; }
    public double? Weight { get; private set; }
    public Guid ProductId { get; private set; }
}