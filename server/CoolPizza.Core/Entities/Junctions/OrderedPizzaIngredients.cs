namespace CoolPizza.Core.Entities.Junctions;

public class OrderedPizzaIngredients: Entity
{
    public Guid OrderedPizzaId { get; private set; }
    public Guid IngredientId { get; private set; }
}