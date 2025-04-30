namespace CoolPizza.Core.Entities.Products;

public abstract class Variation: Entity
{
    public string ImgUrl { get; private set; }
    public decimal Price { get; private set; }
    public Guid ProductId { get; private set; }
}