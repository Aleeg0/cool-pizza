using System.Text.Json.Serialization;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Entities;

public class Ingredient: Entity
{
    public const int MaxNameLength = 128;
    
    public string Name {get; private set;}
    public string ImgUrl {get; private set;}
    public decimal Price {get; private set;}
    
    [JsonIgnore]
    public ICollection<Pizza> Pizzas {get; private set;}
    
    [JsonIgnore]
    public ICollection<OrderedPizza> OrderedPizzas {get; private set;}
    
    public static string JoinIngredientsNames(List<string> ingredientsNames) =>
        string.Join(", ", ingredientsNames);
}