namespace CoolPizza.Core.Entities.Junctions;

public class PizzaIngredients: Entity
{
    public Guid PizzaId { get; private set; }
    public Guid IngredientId { get; private set; }
}