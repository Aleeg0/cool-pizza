namespace CoolPizza.Core.Entities.Products;

public class Pizza: Entity
{
    public const int DoughMaxLength = 64;
    
    public string ImgUrl { get; private set; }
    public decimal Price { get; private set; }
    public int Size {get; private set;}
    public string Dough { get; private set; }
    public double? Weight { get; private set; }
    public Guid ProductId { get; private set; }
    public ICollection<Ingredient> Ingredients { get; private set; }
}