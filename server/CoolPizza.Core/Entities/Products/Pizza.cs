namespace CoolPizza.Core.Entities.Products;

public abstract class Pizza: Variation
{
    public const int DoughMaxLength = 64;
    public int Size {get; private set;}
    public string Dough { get; private set; }
    public double? Weight { get; private set; }
    public ICollection<Ingredient> Ingredients { get; private set; }
}