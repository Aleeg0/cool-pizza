﻿using CoolPizza.Core.Entities.Orders;
using CoolPizza.Core.Entities.Products;

namespace CoolPizza.Core.Abstractions;

public interface IOrderedGoodsRepository
{
    Task<OrderedGoods> CreateAsync(Guid cartId, Goods goods);
    Task<OrderedGoods?> FindByIdAsync(Guid id);
    Task<OrderedGoods?> FindByCartAndGoodAsync(Guid cartId, Guid goodsId);
    Task<bool> UpdateAsync(Guid id, int quantity);
    Task<bool> RemoveAsync(Guid id);
}