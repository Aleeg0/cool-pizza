using CoolPizza.Core.DTOs;
using CoolPizza.Core.DTOs.Orders;
using CoolPizza.Core.Entities.Orders;

namespace CoolPizza.Core.Abstractions;

public interface ICartRepository
{
    Task<OrderInfoDto?> GetCartById(Guid id);
    Task<OrderedPizzaDto> AddPizzaItem(Guid? cartId, Guid pizzaId, List<Guid> ingredientsIds);
    Task<OrderedGoodsDto> AddGoodsItem(Guid? cartId, Guid goodsId);
    Task<OrderedPizza> UpdatePizzaItemQuantity(Guid cartId, Guid pizzaId, int newQuantity);
    Task<OrderedGoods> UpdateGoodsItemQuantity(Guid cartId, Guid goodsId, int newQuantity);
    Task<bool> DeletePizzaItem(Guid cartId, Guid pizzaId);
    Task<bool> DeleteGoodsItem(Guid cartId, Guid goodsId);
}