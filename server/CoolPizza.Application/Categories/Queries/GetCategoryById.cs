using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Categories.Queries;

public class GetCategoryByIdQuery : IRequest<Category>
{
    public Guid Id { get; init; }
}

public class GetCategoryByIdQueryHandler(ICategoriesRepository categoriesRepository) : IRequestHandler<GetCategoryByIdQuery, Category>
{
    public async Task<Category> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await categoriesRepository.GetByIdAsync(request.Id);
        
        if (category is null)
            throw new NotFoundException(nameof(Category), request.Id);
        
        return category;
    }
}