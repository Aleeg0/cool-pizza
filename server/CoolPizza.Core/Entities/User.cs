using CoolPizza.Core.Entities.Orders;

namespace CoolPizza.Core.Entities;

public class User: Entity
{
    public const int NameMaxLength = 32;
    public const int EmailMaxLength = 128;
    public const int PhoneMaxLength = 16;
    
    public string Email {get; private set;} = null!;
    public string Password {get; private set;} = null!;
    public string? FirstName {get; private set;} 
    public string? LastName {get; private set;} 
    public string? Phone {get; private set;}

    private User(string email, string password, string? firstName, string? lastName, string? phone)
    {
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        Phone = phone;
    }

    public ICollection<Order> Orders { get; private set; } = [];

    public static User Create(string email, string hashPassword, string? firstName, string? lastName, string? phone)
    {
        if (email.Length > EmailMaxLength)
            throw new ArgumentException($"The email address must be less then ${EmailMaxLength}");
        
        if (phone is not null && phone.Length > PhoneMaxLength)
            throw new ArgumentException($"The phone number must be less then ${PhoneMaxLength}");
        
        if (lastName is not null && lastName.Length > NameMaxLength)
            throw new ArgumentException($"The last name must be less then ${NameMaxLength}");
        
        if (firstName is not null && firstName.Length > NameMaxLength)
            throw new ArgumentException($"The first name must be less then ${NameMaxLength}");

        return new User(email, hashPassword, firstName, lastName, phone);
    }
}