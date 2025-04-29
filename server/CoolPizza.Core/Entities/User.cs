using CoolPizza.Core.Entities.Orders;

namespace CoolPizza.Core.Entities;

public class User: Entity
{
    public const int NameMaxLength = 128;
    public const int EmailMaxLength = 128;
    public const int PasswordMaxLength = 32;
    public const int PhoneMaxLength = 16;
    
    public string Name {get; private set;} 
    public string Email {get; private set;}
    public string Password {get; private set;}
    public string Phone {get; private set;} 
    
    public ICollection<Order> Orders {get; private set;}
}