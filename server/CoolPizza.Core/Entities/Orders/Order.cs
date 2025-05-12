using CoolPizza.Core.Enums;

namespace CoolPizza.Core.Entities.Orders;

public class Order : Entity
{
    public const int UserPropertiesMaxLength = 128;
    public const int AddressMaxLength = 255;
    public const int PhoneMaxLength = 16;

    public string? Name { get; private set; }
    public string? Email { get; private set; }
    public string? Phone { get; private set; }
    public string? Address { get; private set; }
    public string? Comment { get; private set; }
    public decimal TotalAmount { get; private set; } = 0;
    public OrderStatus Status { get; private set; } = OrderStatus.New;
    public DeliveryType DeliveryType { get; private set; } = DeliveryType.Pickup;
    public DateTime? OrderedAt { get; private set; }
    public DateTime? PaidAt { get; private set; } = null;
    public Guid? UserId { get; private set; } = null;

    public ICollection<OrderedGoods> GoodsLine { get; private set; } = [];
    public ICollection<OrderedPizza> PizzasLine { get; private set; } = [];

    public void AddPersonalInfo(string name, string email, string phone, string address, string? comment)
    {
        if (name.Length > UserPropertiesMaxLength)
            throw new ArgumentException($"Name cannot be more then {UserPropertiesMaxLength}");

        if (email.Length > UserPropertiesMaxLength)
            throw new ArgumentException($"Name cannot be more then {UserPropertiesMaxLength}");

        if (phone.Length > PhoneMaxLength)
            throw new ArgumentException($"Phone cannot be more then {PhoneMaxLength}");

        if (address.Length > AddressMaxLength)
            throw new ArgumentException($"Address cannot be more then {AddressMaxLength}");

        Name = name;
        Email = email;
        Phone = phone;
        Address = address;

        if (comment is not null)
            Comment = comment;
    }

    public void AddUserId(Guid userId)
    {
        UserId = userId;
    }

    public void SubmitOrder()
    {
        OrderedAt = DateTime.UtcNow;
        Status = OrderStatus.Start;
    }

}