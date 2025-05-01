using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Categories.Queries;

public class GetCategoriesQuery : IRequest<List<Category>>{ }

public class GetCategoriesQueryHandler(ICategoriesRepository categoriesRepository) : IRequestHandler<GetCategoriesQuery, List<Category>>
{
    
    public async Task<List<Category>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await categoriesRepository.GetAllAsync();
        return categories;
    }
}