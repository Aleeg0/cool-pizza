using CoolPizza.Core.Enums;

namespace CoolPizza.Core.Entities.Orders;

public class Order: Entity
{
    public const int TokenMaxLength = 255;
    public const int UserPropertiesMaxLength = 128;
    public const int AddressMaxLength = 255;
    public const int PhoneMaxLength = 16;
    
    public string Token { get; private set; }
    public string? Name {get; private set;} 
    public string? Email {get; private set;}
    public string? Phone {get; private set;}
    public string? Address {get; private set;}
    public string? Comment {get; private set;}
    public decimal TotalAmount { get; private set; } = 0;
    public OrderStatus Status { get; private set; } = OrderStatus.New;
    public DeliveryType DeliveryType { get; private set; } = DeliveryType.Pickup;
    public DateTime? PaidAt { get; private set; } = null;
    public Guid? UserId { get; private set; } = null;

    public ICollection<OrderedGoods> GoodsLine { get; private set; }
    public ICollection<OrderedPizza> PizzasLine { get; private set; }
}