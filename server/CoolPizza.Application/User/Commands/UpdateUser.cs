using CoolPizza.Application.Exceptions;
using CoolPizza.Application.User.DTOs;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.User.Commands;

public class UpdateUserCommand : IRequest<UserDto>
{
    public Guid? Id { get; set; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? Phone { get; init; }
}

public class UpdateUserCommandHandler(IUserRepository userRepository) : IRequestHandler<UpdateUserCommand, UserDto>
{
    public async Task<UserDto> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        if (request.Id is null)
            throw new UnauthorizedException();
        
        var user = await userRepository.FindByIdAsync(request.Id.Value);
        if (user is null)
            throw new NotFoundException();
        
        var phone = request.Phone?.Replace(" ", "").Replace("-", "");

        await userRepository.UpdateUserAsync(user.Id, phone, request.FirstName, request.LastName);

        return new UserDto(
            user.FirstName,
            user.LastName,
            user.Email,
            user.Phone
        );
    }
}