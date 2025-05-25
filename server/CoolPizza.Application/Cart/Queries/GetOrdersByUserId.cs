using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Cart.Queries;

public class GetOrdersByUserIdQuery: IRequest<GetOrdersDto>
{
    public Guid? UserId { get; set; }
}

public class GetOrdersByUserIdHandler(IOrdersRepository ordersRepository, IProductsRepository productsRepository) : IRequestHandler<GetOrdersByUserIdQuery, GetOrdersDto>
{
    public async Task<GetOrdersDto> Handle(GetOrdersByUserIdQuery request, CancellationToken cancellationToken)
    {
        if (request.UserId is null)
            throw new UnauthorizedException("User is not unauthenticated.");
        
        var orders = await ordersRepository.GetFullOrdersByUserIdAsync(request.UserId.Value);

        if (!orders.Any())
            return new GetOrdersDto([]);

        // Собираем все productId по всем заказам
        var allProductIds = orders
            .SelectMany(o => o.PizzasLine
                .Select(op => op.Pizza.ProductId)
                .Concat(o.GoodsLine
                    .Select(og => og.Goods.ProductId)))
            .ToHashSet();

        var products = await productsRepository.GetCartProjectionRangeAsync(allProductIds);
        var productsDict = products.ToDictionary(p => p.Id);

        // Собираем список DTO-шек
        var cartsDto = orders.Select(order =>
        {
            var cartPizzaLines = order.PizzasLine.Select(cartPizza =>
            {
                var pizza = cartPizza.Pizza;
                var product = productsDict[pizza.ProductId];

                string details = pizza.GetPizzaDetails();
                string addedIngredients = Ingredient.JoinIngredientsNames(cartPizza.Ingredients.Select(i => i.Name).ToList());

                return new CartItemDto(
                    cartPizza.Id,
                    product.Name,
                    details,
                    product.BaseImg,
                    pizza.Price,
                    cartPizza.Quantity,
                    addedIngredients
                );
            }).ToList();

            var cartGoodsLines = order.GoodsLine.Select(cartGoods =>
            {
                var goods = cartGoods.Goods;
                var product = productsDict[goods.ProductId];

                return new CartItemDto(
                    cartGoods.Id,
                    product.Name,
                    goods.Details,
                    product.BaseImg,
                    goods.Price,
                    cartGoods.Quantity
                );
            }).ToList();

            return new GetOrderDto(
                order.Id,
                order.TotalAmount,
                order.OrderedAt!.Value,
                cartPizzaLines,
                cartGoodsLines
            );
        }).ToList();

        return new GetOrdersDto(cartsDto);
    }
}