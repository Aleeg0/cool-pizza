using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Categories.Commands;

public record CreateCategoryCommand() : IRequest<Category>
{
    public string Name { get; init; }
    public string Value { get; init; }
}

public class CreateCategoryCommandHandler(ICategoriesRepository categoriesRepository) : IRequestHandler<CreateCategoryCommand, Category>
{
    public async Task<Category> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var newCategory = await categoriesRepository.CreateAsync(request.Name, request.Value);
        return newCategory;
    }
}