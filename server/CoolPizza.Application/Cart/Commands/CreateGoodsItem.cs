﻿using CoolPizza.Application.Cart.DTOs;
using CoolPizza.Application.Exceptions;
using CoolPizza.Core.Abstractions;
using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;
using MediatR;

namespace CoolPizza.Application.Cart.Commands;

public class CreateGoodsItemCommand : IRequest<CartItemDto>
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
) : IRequestHandler<CreateGoodsItemCommand, CartItemDto>
{
    public async Task<CartItemDto> Handle(CreateGoodsItemCommand request, CancellationToken cancellationToken)
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
           
           // находим простой продукт
           var goods = await goodsRepository.FindByIdAsync(request.GoodsId);
           
           if (goods is null)
               throw new NotFoundException(nameof(Goods), request.GoodsId);

           // пытаем найти существующий простой продукт в корзине
           var goodsCartItem = await orderedGoodsRepository.FindByCartAndGoodAsync(cart.Id, goods.Id);

           if (goodsCartItem is null)
               goodsCartItem = await orderedGoodsRepository.CreateAsync(cart.Id, goods);
           else if (!await orderedGoodsRepository.UpdateAsync(goodsCartItem.Id, goodsCartItem.Quantity + 1))
               throw new Exception("Failed to add one more CartGoods");

           // находим соответсвующий продукт
           var product = await productsRepository.FindByIdAsync(goods.ProductId);
           
           if (product is null)
               throw new NotFoundException(nameof(Product), goods.ProductId);

           // обновляем цену корзины
           await ordersRepository.UpdateTotalAmount(cart.Id);
           
           // подтверждаем транзакцию
           await unitOfWork.CommitAsync();

           return new CartItemDto(
               goodsCartItem.Id,
               product.Name,
               goods.Details,
               product.BaseImg,
               goods.Price,
               goodsCartItem.Quantity
           );
       }
       catch
       {
           await unitOfWork.RollbackAsync();
           throw;
       }
    }
}