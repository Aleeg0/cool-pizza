using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class CreatePizzaItemCommand :IRequest<CartItemDto>
{
    public Guid? Id { get; set; }
    public Guid PizzaId { get; init; }
    public List<Guid> IngredientsIds { get; init; } = [];
}

public class CreatePizzaItemHandler(
    IUnitOfWork unitOfWork, 
    IOrdersRepository ordersRepository,
    IPizzasRepository pizzasRepository,
    IOrderedPizzasRepository orderedPizzasRepository,
    IIngredientsRepository ingredientsRepository,
    IProductsRepository productsRepository
) : IRequestHandler<CreatePizzaItemCommand, CartItemDto>
{
    public async Task<CartItemDto> Handle(CreatePizzaItemCommand request, CancellationToken cancellationToken)
    {
        // потом работаем с ней
        await unitOfWork.BeginTransactionAsync();
        try
        {
            Order? cart;
        
            // если корзины не было - создаем, иначе находим
            if (!request.Id.HasValue)
            {
                cart = await ordersRepository.CreateAsync();
                request.Id = cart.Id;
            }
            else
                cart = await ordersRepository.FindByIdAsync(request.Id.Value);

            if (cart is null)
                throw new NotFoundException("cart", request.Id!);

            // находим пиццу
            var pizza = await pizzasRepository.FindByIdAsync(request.PizzaId);

            if (pizza is null)
                throw new NotFoundException(nameof(Pizza), request.PizzaId);
            
            // находим ингредиенты
            var ingredients = await ingredientsRepository.FindRangeAsync(request.IngredientsIds);
            
            if (ingredients.Count != request.IngredientsIds.Count)
                throw new NotFoundException("Not all ingredients were found");

            // пытаем найти существующий простой продукт в корзине
            var pizzaCartItem = await orderedPizzasRepository.FindByCartAndPizzaAsync(cart.Id, pizza.Id);

            // если не была найдена, то создаем, иначе увеличиваем количество на 1
            if (pizzaCartItem is null)
                pizzaCartItem = await orderedPizzasRepository.CreateAsync(cart.Id, pizza, ingredients);
            else if (!await orderedPizzasRepository.UpdateAsync(pizzaCartItem.Id, pizzaCartItem.Quantity + 1))
                throw new Exception("Failed to add one more CartPizza");

            // находим соответсвующий продукт
            var product = await productsRepository.FindByIdAsync(pizza.ProductId);

            if (product is null)
                throw new NotFoundException(nameof(Product), pizza.ProductId);

            // обновляем цену корзины
            await ordersRepository.UpdateTotalAmount(cart.Id);

            // подтверждаем транзакцию
            await unitOfWork.CommitAsync();
            
            // формируем ответ
            string details = pizza.GetPizzaDetails();
            string addedIngredients = Ingredient.JoinIngredientsNames(pizzaCartItem.Ingredients.Select(i => i.Name).ToList());

            return new CartItemDto(
                pizzaCartItem.Id,
                product.Name,
                details,
                product.BaseImg,
                pizza.Price,
                pizzaCartItem.Quantity,
                addedIngredients
            );
        }
        catch
        {
          await unitOfWork.RollbackAsync();
          throw;
        }
    }
}