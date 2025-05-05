import {CartItem} from "@/store/model/Cart";
import {CartItemProps, onUpdateQuantityType} from "./types";

export const CURRENCY = "руб.";

export const mapToCartItemProps = (items: CartItem[], onUpdateQuantity: onUpdateQuantityType) : CartItemProps[] =>
  items.map((item: CartItem) => ({
    id: item.id,
    name: item.name,
    details: item.details,
    addedIngredientsLine: item.addedIngredientsLine,
    imgUrl: item.imgUrl,
    price: item.price,
    quantity: item.quantity,
    currency: CURRENCY,
    onUpdateQuantity
  }));