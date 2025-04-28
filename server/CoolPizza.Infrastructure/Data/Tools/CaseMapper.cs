using System.Text;

namespace CoolPizza.Infrastructure.Data.Tools;

public static class CaseMapper
{
    public static string ToSnakeCase(string? input)
    {
        if (string.IsNullOrEmpty(input))
            return "";

        var result = new StringBuilder();
        for (int i = 0; i < input.Length; i++)
        {
            char c = input[i];
            if (char.IsUpper(c))
            {
                if (i > 0)
                    result.Append('_');
                result.Append(char.ToLower(c));
            }
            else
            {
                result.Append(c);
            }
        }
        return result.ToString();
    }
}