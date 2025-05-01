using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Categories.Commands;

public class DeleteCategoryByIdCommand : IRequest<Guid>
{
    public Guid Id { get; init; }
}

public class DeleteCategoryByIdCommandHandler(ICategoriesRepository categoriesRepository) : IRequestHandler<DeleteCategoryByIdCommand, Guid>
{
    public async Task<Guid> Handle(DeleteCategoryByIdCommand request, CancellationToken cancellationToken)
    {
        var isDeleted = await categoriesRepository.DeleteById(request.Id);

        if (!isDeleted)
            throw new NotFoundException(nameof(Category), request.Id);
        
        return request.Id;
    }
}