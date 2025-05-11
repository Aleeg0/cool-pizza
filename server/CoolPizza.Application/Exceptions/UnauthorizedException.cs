namespace CoolPizza.Application.Exceptions;

public class UnauthorizedException : Exception
{
    public UnauthorizedException() :
        base("User is not' unauthorized") { }

    public UnauthorizedException(string message) :
        base(message) { }
}