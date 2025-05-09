using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using CoolPizza.Core.Abstractions;

namespace CoolPizza.Infrastructure.Services;

public class AddressesService(HttpClient httpClient) : IAddressesService
{
    public async Task<List<string>> GetAddressesAsync(string? value)
    {
        var apiKey = Environment.GetEnvironmentVariable("DADATA__APIKEY");
        var body = new
        {
            query = value,
            locations = new[] 
            {
                new { country_iso_code = "BY" }
            },
            count = 5
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address")
        {
            Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json")
        };
        request.Headers.Add("Authorization", $"Token {apiKey}");

        var response = await httpClient.SendAsync(request);
        var json = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<AddressesResponse>(json, JsonSerializerOptions.Web);
        return result?.Suggestions.Select(s => s.Value).ToList() ?? new List<string>();
    }
    
    private class AddressesResponse
    {
        public List<Suggestion> Suggestions { get; set; }
    }

    private class Suggestion
    {
        public string Value { get; set; }
    }
    
    private class AddressData
    {
        [JsonPropertyName("country_iso_code")]
        public string CountryIsoCode { get; init; }
    
        // Добавьте другие нужные вам поля
    }
}