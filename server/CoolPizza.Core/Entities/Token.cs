namespace CoolPizza.Core.Entities;

public class Token : Entity
{
    public const int DefaultExpirationDays = 7;
    
    public Guid Value { get; private set; }
    public Guid UserId { get; private set; }

    public Token(Guid value, Guid userId)
    {
        Value = value;
        UserId = userId;
    }
}