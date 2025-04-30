namespace CoolPizza.Core.Entities.Orders;

public class OrderedGoods: Entity
{
    public int Quantity {get; private set;}
    public Guid GoodsId {get; private set;}
    public Guid OrderId {get; private set;}
}