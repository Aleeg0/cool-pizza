using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Categories.Commands;

public class PutCategoryCommand : IRequest<Category>
{
    public Guid Id { get; init; }
    public string? Name { get; init; }
    public string? Value {get; init; }
}

public class PutCategoryCommandHandler(ICategoriesRepository categoriesRepository) : IRequestHandler<PutCategoryCommand, Category>
{
    public async Task<Category> Handle(PutCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await categoriesRepository.UpdateById(request.Id, request.Name, request.Value);

        if (category is null)
            throw new NotFoundException(nameof(Category), request.Id);
        
        return category;
    }
}