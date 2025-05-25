using CoolPizza.Application;
using CoolPizza.Infrastructure;
using DotNetEnv;
using PizzaService.API.MiddleWares;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddHttpClient();

builder.Services.AddSwaggerGen();

builder.Services.AddInfrastructure(
    $"Host={Env.GetString("DB_HOST")};" +
    $"Database={Env.GetString("DB_NAME")};" +
    $"User Id={Env.GetString("DB_USER")};" +
    $"Password={Env.GetString("DB_PASSWORD")}"
);

builder.Services.AddApplication();

var app = builder.Build();

// tools for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMiddleware>()
    .UseMiddleware<JwtAuthMiddleware>();

app.UseHttpsRedirection();

app.MapControllers();

app.UseCors(cors =>
{
    cors.WithOrigins(Env.GetString("CLIENT_DOMAIN"))
        .WithExposedHeaders("X-Cart-Token")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

app.Run();