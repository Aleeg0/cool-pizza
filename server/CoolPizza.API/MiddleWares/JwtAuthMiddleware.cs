using System.Security.Claims;

namespace PizzaService.API.MiddleWares;

public class JwtAuthMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext context)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
            {
                context.Items["UserId"] = userId;
            }
        }

        await next(context);
    }
    
}