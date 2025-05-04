using CoolPizza.Core.Abstractions;
using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Orders;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoolPizza.Infrastructure.Repositories;

public class CartRepository(ApplicationDbContext context) : ICartRepository
{
    public async Task<OrderInfoDto?> GetCartById(Guid id)
    {
        var order = await context.Orders
            .Where(o => o.Id == id)
            .Include(o => o.PizzasLine).ThenInclude(op => op.Pizza)
            .Include(o => o.PizzasLine).ThenInclude(op => op.Ingredients)
            .Include(o => o.GoodsLine).ThenInclude(og => og.Goods)
            .FirstOrDefaultAsync();

        if (order == null) return null;

        // Собрать все productId из Pizza и Goods
        var pizzaProductIds = order.PizzasLine.Select(p => p.Pizza.ProductId).ToHashSet();
        var goodsProductIds = order.GoodsLine.Select(g => g.Goods.ProductId).ToHashSet();
        var allProductIds = pizzaProductIds.Union(goodsProductIds).ToList();

        // Одним запросом получаем все продукты
        var products = await context.Products
            .Where(p => allProductIds.Contains(p.Id))
            .Select(p => new {p.Id, p.Name, p.BaseImg})
            .ToDictionaryAsync(p =>  p.Id);

        // Собираем DTO-шки
        var cartPizzaLines = order.PizzasLine.Select(cartPizza =>
        {
            var pizza = cartPizza.Pizza;
            var product = products[pizza.ProductId];

            return new OrderedPizzaDto(
                cartPizza.Id,
                product.Name,
                product.BaseImg,
                pizza.Price,
                cartPizza.Quantity,
                pizza.Size,
                pizza.Dough,
                cartPizza.Ingredients.Select(i => i.Name).ToList()
            );
        }).ToList();

        var cartGoodsLines = order.GoodsLine.Select(cartGoods =>
        {
            var goods = cartGoods.Goods;
            var product = products[goods.ProductId];

            return new OrderedGoodsDto(
                cartGoods.Id,
                product.Name,
                product.BaseImg,
                goods.Price,
                cartGoods.Quantity,
                goods.Details
            );
        }).ToList();

        return new OrderInfoDto(
            order,
            cartPizzaLines,
            cartGoodsLines
        );
    }
    
    public async Task<OrderedPizzaDto> AddPizzaItem(Guid? cartId, Guid pizzaId, List<Guid> ingredientsIds)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            Order? cart;
            if (cartId.HasValue)
            {
                cart = await context.Orders.FindAsync(cartId);
            }
            else
            {
                cart = await CreateCart();
                cartId = cart.Id;
            }
            
            var pizza = await context.Pizzas.FindAsync(pizzaId);
            var ingredients = await context.Ingredients
                .Where(i => ingredientsIds.Contains(i.Id))
                .ToListAsync();

            if (pizza is null || cart is null || ingredients.Count != ingredientsIds.Count)
                throw new ArgumentException("Order, pizza or ingredients not found.");

            // пытаем найти уже существующую пиццу
            var cartPizza = await FindPizzaCartItem(cartId.Value, pizzaId, ingredientsIds);
            
            // если нашли, то добавляем quantity
            if (cartPizza is not null)
            {
                cartPizza.UpdateQuantity(cartPizza.Quantity + 1);
            }
            else
            {
                cartPizza = OrderedPizza.Create(cartId.Value, pizza, ingredients);
                await context.OrderedPizzas.AddAsync(cartPizza);
            }
            
            await context.SaveChangesAsync();
            await UpdateTotalAmount(cartId.Value);
            await transaction.CommitAsync();
            
            var product = await context.Products.FindAsync(pizza.ProductId);
            
            if (product is null) 
                throw new ArgumentException("Product not found.");
            
            return new OrderedPizzaDto(
                cartPizza.Id,
                product.Name,
                product.BaseImg,
                pizza.Price,
                cartPizza.Quantity,
                pizza.Size,
                pizza.Dough,
                cartPizza.Ingredients.Select(i => i.Name).ToList()
            );
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<OrderedGoodsDto> AddGoodsItem(Guid? cartId, Guid goodsId)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            Order? cart;
            if (cartId.HasValue)
            {
                cart = await context.Orders.FindAsync(cartId);
            }
            else
            {
                cart = await CreateCart();
                cartId = cart.Id;
            }
            
            var goods = await context.Goods.FindAsync(goodsId);

            if (goods is null || cart is null)
                throw new ArgumentException("Order or goods not found.");
            
            // пытаем найти уже существующую пиццу
            var cartGoods = await FindGoodsCartItem(cartId.Value, goodsId);
            
            // если нашли, то добавляем quantity
            if (cartGoods is not null)
            {
                cartGoods.UpdateQuantity(cartGoods.Quantity + 1);
            }
            else
            {
                cartGoods = OrderedGoods.Create(cartId.Value, goods);
                await context.OrderedGoods.AddAsync(cartGoods);
            }
            
            await context.SaveChangesAsync();
            await UpdateTotalAmount(cartId.Value);
            await transaction.CommitAsync();
            
            var product = await context.Products.FindAsync(goods.ProductId);
            
            if (product is null) 
                throw new ArgumentException("Product not found.");
            
            return new OrderedGoodsDto(
                cartGoods.Id,
                product.Name,
                product.BaseImg,
                goods.Price,
                cartGoods.Quantity,
                goods.Details
            );
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<OrderedPizza> UpdatePizzaItemQuantity(Guid cartId, Guid pizzaId, int newQuantity)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            var pizzaItem = await context.OrderedPizzas
                .FirstOrDefaultAsync(op => op.OrderId == cartId && op.Id == pizzaId);

            if (pizzaItem is null)
                throw new ArgumentException("Pizza cart item not found.");

            pizzaItem.UpdateQuantity(newQuantity);
            await context.SaveChangesAsync();
            await UpdateTotalAmount(pizzaItem.OrderId);
            await transaction.CommitAsync();

            return pizzaItem;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    
    public async Task<OrderedGoods> UpdateGoodsItemQuantity(Guid cartId, Guid goodsId, int newQuantity)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            var goodsItem = await context.OrderedGoods
                .FirstOrDefaultAsync(op => op.OrderId == cartId && op.Id == goodsId);

            if (goodsItem is null)
                throw new ArgumentException("Goods cart item not found.");

            goodsItem.UpdateQuantity(newQuantity);
            await context.SaveChangesAsync();
            await UpdateTotalAmount(goodsItem.OrderId);
            await transaction.CommitAsync();

            return goodsItem;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<bool> DeletePizzaItem(Guid cartId, Guid pizzaId)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            var pizzaItem = await context.OrderedPizzas
                .FirstOrDefaultAsync(op => op.OrderId == cartId && op.Id == pizzaId);

            if (pizzaItem is null)
                throw new ArgumentException("Goods cart item not found.");

            context.OrderedPizzas.Remove(pizzaItem);
            await context.SaveChangesAsync();
            await UpdateTotalAmount(pizzaItem.OrderId);
            await transaction.CommitAsync();

            return true;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    
    public async Task<bool> DeleteGoodsItem(Guid cartId, Guid goodsId)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            var goodsItem = await context.OrderedGoods
                .FirstOrDefaultAsync(op => op.OrderId == cartId && op.Id == goodsId);

            if (goodsItem is null)
                throw new ArgumentException("Goods cart item not found.");

            context.OrderedGoods.Remove(goodsItem);
            await context.SaveChangesAsync();
            await UpdateTotalAmount(goodsItem.OrderId);
            await transaction.CommitAsync();

            return true;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task UpdateTotalAmount(Guid cartId)
    {
        // считаем сумму каждой Line
        decimal calculatedTotalAmount = await UpdatePizzasTotalAmount(cartId) +
               await UpdateGoodsTotalAmount(cartId);
        
        // обновляем значение
        await context.Orders
            .Where(o => o.Id == cartId)
            .ExecuteUpdateAsync(s => s
                .SetProperty(o => o.TotalAmount, calculatedTotalAmount));
    }
    
    private async Task<Order> CreateCart()
    {
        var newOrder = new Order();
        await context.Orders.AddAsync(newOrder);
        await context.SaveChangesAsync();
        return newOrder;
    }

    private async Task<decimal> UpdatePizzasTotalAmount(Guid cartId) =>
        await context.OrderedPizzas
            .Where(op => op.OrderId == cartId)
            .Select(op => new 
            {
                PizzaTotal = op.Quantity * op.Pizza.Price,
                IngredientsTotal = op.Ingredients.Sum(i => i.Price)
            })
            .SumAsync(op => op.PizzaTotal + op.IngredientsTotal);

    private async Task<decimal> UpdateGoodsTotalAmount(Guid cartId) => 
        await context.OrderedGoods
            .Where(op => op.OrderId == cartId)
            .Join(context.Goods,
                og => og.GoodsId,
                g => g.Id,
                (og, g) => og.Quantity * g.Price)
            .SumAsync();
    
    private async Task<OrderedPizza?> FindPizzaCartItem(Guid cartId, Guid pizzaId, List<Guid> ingredientsIds) =>
        await context.OrderedPizzas
            .Include(op => op.Ingredients)
            .FirstOrDefaultAsync(op =>
                op.OrderId == cartId &&
                op.PizzaId == pizzaId &&
                op.Ingredients.Count == ingredientsIds.Count &&
                op.Ingredients.All(i => ingredientsIds.Contains(i.Id)));

    private async Task<OrderedGoods?> FindGoodsCartItem(Guid cartId, Guid goodsId) =>
        await context.OrderedGoods
            .FirstOrDefaultAsync(op =>
                op.OrderId == cartId &&
                op.GoodsId == goodsId
            );
}