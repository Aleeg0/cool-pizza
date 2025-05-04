using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class CreateGoodsItemCommand : IRequest<CreateCartGoodsDto>
{
    public Guid? Id { get; set; }
    public Guid GoodsId { get; init; }
}

public class CreateGoodsItemHandler(
    IUnitOfWork unitOfWork, 
    IOrdersRepository ordersRepository,
    IGoodsRepository goodsRepository,
    IOrderedGoodsRepository orderedGoodsRepository,
    IProductsRepository productsRepository
) : IRequestHandler<CreateGoodsItemCommand, CreateCartGoodsDto>
{
    public async Task<CreateCartGoodsDto> Handle(CreateGoodsItemCommand request, CancellationToken cancellationToken)
    {
       // потом работаем с ней
       await unitOfWork.BeginTransactionAsync();
       try
       {
           Order? cart;
           
           // если корзины не было - создаем, иначе находим
           if (!request.Id.HasValue)
               cart =  await ordersRepository.CreateAsync();
           else
               cart = await ordersRepository.FindByIdAsync(request.Id.Value);
           
           if (cart is null)
               throw new NotFoundException("cart", request.Id!);
           
           // находим простой продукт
           var goods = await goodsRepository.FindByIdAsync(request.GoodsId);
           
           if (goods is null)
               throw new NotFoundException(nameof(Goods), request.GoodsId);

           // пытаем найти существующий простой продукт в корзине
           var goodsCartItem = await orderedGoodsRepository.FindAsync(cart.Id, goods.Id);

           if (goodsCartItem is null)
               goodsCartItem = await orderedGoodsRepository.CreateAsync(cart.Id, goods);
           else if (!await orderedGoodsRepository.UpdateAsync(goodsCartItem.Id, goodsCartItem.Quantity + 1))
               throw new Exception("Failed to add one more CartGoods");

           // находим соответсвующий продукт
           var product = await productsRepository.FindByIdAsync(goods.ProductId);
           
           if (product is null)
               throw new NotFoundException(nameof(Product), goods.ProductId);

           // обновляем цену корзины
           var newTotalAmount = await ordersRepository.UpdateTotalAmount(cart.Id);
           
           // подтверждаем транзакцию
           await unitOfWork.CommitAsync();
           
           return new CreateCartGoodsDto(
               newTotalAmount,
               new CartGoodsDto(
                   goodsCartItem.Id,
                   product.Name,
                   product.BaseImg,
                   goods.Price,
                   goodsCartItem.Quantity,
                   goods.Details
               )
           ); 
       }
       catch
       {
           await unitOfWork.RollbackAsync();
           throw;
       }
    }
}