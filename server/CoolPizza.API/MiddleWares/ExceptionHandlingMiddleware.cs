using CoolPizza.Application.Exceptions;

namespace PizzaService.API.MiddleWares;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception occurred");

            context.Response.ContentType = "application/json";
            
            context.Response.StatusCode = ex switch
            {
                ArgumentException => StatusCodes.Status400BadRequest,
                NotFoundException => StatusCodes.Status404NotFound,
               // ValidationException => StatusCodes.Status400BadRequest,
                _ => StatusCodes.Status500InternalServerError
            };

            var result = new
            {
                error = ex.Message,
                status = context.Response.StatusCode
            };

            await context.Response.WriteAsJsonAsync(result);
        }
    }
}