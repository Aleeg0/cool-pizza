namespace CoolPizza.Core.Entities.Junctions;

public class OrderedPizzaIngredients
{
    public Guid OrderedPizzaId { get; set; }
    public Guid IngredientId { get; set; }
}