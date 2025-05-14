using CoolPizza.Application.Exceptions;
using CoolPizza.Application.User.DTOs;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.User.Queries;

public class GetUserQuery : IRequest<UserDto>
{
    public Guid? UserId { get; init; }
}

public class GetUserQueryHandler(IUserRepository userRepository) : IRequestHandler<GetUserQuery, UserDto>
{
    public async Task<UserDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        if (request.UserId is null)
            throw new UnauthorizedException();
        
        var user = await userRepository.FindByIdAsync(request.UserId.Value);
        if (user is null)
            throw new NotFoundException("User not found");

        return new UserDto(
            user.FirstName,
            user.LastName,
            user.Email,
            user.Phone
        );
    }
}