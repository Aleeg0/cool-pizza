import {DefaultState} from "@/store/model/Shared";
import {Cart} from "@/store/model/Cart";
import {UUID} from "@/store/types/shared";

export interface Order extends Cart {
  id: UUID,
  orderedAt: string;
}

export interface OrderState extends DefaultState<Order[]>{}

export interface OrderResponse {
  orders: Order[];
}