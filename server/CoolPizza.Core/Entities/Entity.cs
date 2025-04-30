namespace CoolPizza.Core.Entities;

public abstract class Entity
{
    public Guid Id {get; private set;}
    public DateTime CreatedAt {get; private set;}
}