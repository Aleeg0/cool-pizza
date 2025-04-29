using CoolPizza.Core.Entities.Orders;

namespace CoolPizza.Core.Entities;

public class User
{
    public string? Name {get; private set;} 
    public string Email {get; private set;}
    public string? Password {get; private set;}
    public string Phone {get; private set;} 
    
    public ICollection<Order> Orders {get; private set;}
}