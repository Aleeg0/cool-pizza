namespace CoolPizza.Core.Entities.Orders;

public class OrderedPizza: Entity
{
    public int Quantity {get; private set;}
    public Guid PizzaId {get; private set;}
    public Guid OrderId {get; private set;}
    public ICollection<Ingredient> Ingredients {get; private set;}
}