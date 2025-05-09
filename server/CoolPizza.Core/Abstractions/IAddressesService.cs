namespace CoolPizza.Core.Abstractions;

public interface IAddressesService
{
    Task<List<string>> GetAddressesAsync(string? value); 
}