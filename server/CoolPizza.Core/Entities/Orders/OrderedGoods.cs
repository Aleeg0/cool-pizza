using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Entities.Orders;

public class OrderedGoods: Entity
{
    public int Quantity {get; private set;}
    public Guid GoodsId {get; private set;}
    public Goods Goods {get; private set;} = null!;
    public Guid OrderId {get; private set;}

    public static OrderedGoods Create(Guid orderId, Goods goods)
    {
        return new OrderedGoods()
        {
            Quantity = 1,
            GoodsId = goods.Id,
            Goods = goods,
            OrderId = orderId
        };
    }
}