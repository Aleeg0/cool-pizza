import {UUID} from "@/store/types/shared";
import {DefaultState} from "@/store/model/Shared";

export interface CartItem {
  id: UUID,
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
  details: string;
  addedIngredientsLine?: string;
}

export interface Cart {
  totalAmount: number;
  pizzaCartLines: CartItem[],
  goodsCartLines: CartItem[],
}

export type CartState = DefaultState<Cart>;

export interface AddPizzaToCartAction {
  pizzaId: UUID,
  ingredientsIds: UUID[];
}

export interface AddGoodsToCartAction {
  goodsId: UUID
}

export interface UpdateCartItem {
  id: UUID;
  quantity: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
}

export interface OrderFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  comment?: string;
}

export type OrderFormField = keyof OrderFormData;