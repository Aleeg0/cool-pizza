using CoolPizza.Application.Addresses.DTOs;
using CoolPizza.Core.Abstractions;
using MediatR;

namespace CoolPizza.Application.Addresses.Queries;

public class GetAddressesQuery : IRequest<GetAddressesDto>
{
    public string SearchValue { get; init; }
}

public class GetAddressesQueryHandler(IAddressesService addressesService) : IRequestHandler<GetAddressesQuery, GetAddressesDto>
{
    public async Task<GetAddressesDto> Handle(GetAddressesQuery request, CancellationToken cancellationToken)
    {
        var suggestions = await addressesService.GetAddressesAsync(request.SearchValue);
        return new GetAddressesDto(suggestions);
    }
}