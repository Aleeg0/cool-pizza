using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using MediatR;

namespace CoolPizza.Application.Cart.Queries;

public class GetCartByIdQuery : IRequest<GetCartDto>
{
    public Guid Id { get; init; }
}

public class GetCartByIdQueryHandler(
    IOrdersRepository ordersRepository,
    IProductsRepository productsRepository
) : IRequestHandler<GetCartByIdQuery, GetCartDto>
{
    public async Task<GetCartDto> Handle(GetCartByIdQuery request, CancellationToken cancellationToken)
    {
        var order = await ordersRepository.GetFullCartByIdAsync(request.Id);

        if (order == null) 
            throw new NotFoundException("Cart", request.Id);
        
        // Собрать все productId из Pizza и Goods
        var pizzaProductIds = order.PizzasLine.Select(p => p.Pizza.ProductId).ToHashSet();
        var goodsProductIds = order.GoodsLine.Select(g => g.Goods.ProductId).ToHashSet();
        var allProductIds = pizzaProductIds.Union(goodsProductIds).ToHashSet();

        // получаем все продукты
        var products = await productsRepository.GetCartProjectionRangeAsync(allProductIds);

        // превращаем их в словарь для ускорения
        var productsDict = products.ToDictionary(p => p.Id);

        // собираем пиццы из корзины
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
        
        // собираем простые продукты из корзины
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

        return new GetCartDto(
            cartPizzaLines,
            cartGoodsLines,
            order.TotalAmount
        );
    }
}