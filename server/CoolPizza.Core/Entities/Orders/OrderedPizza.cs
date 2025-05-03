using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Entities.Orders;

public class OrderedPizza: Entity
{
    public int Quantity { get; private set; }
    public Guid PizzaId { get; private set; }
    public Pizza Pizza { get; private set; } = null!;
    public Guid OrderId { get; private set; }
    public ICollection<Ingredient> Ingredients { get; private set; } = [];

    public static OrderedPizza Create(Guid orderId, Pizza pizza, List<Ingredient> ingredients)
    {
        return new OrderedPizza()
        {
            Quantity = 1,
            PizzaId = pizza.Id,
            Pizza = pizza,
            OrderId = orderId,
            Ingredients = ingredients
        };
    }

    public void UpdateQuantity(int newQuantity)
    {
        Quantity = newQuantity;
    }
}