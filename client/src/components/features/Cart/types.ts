import {UUID} from "@/store/types/shared";

export type onUpdateQuantityType = (id: UUID, quantity: number) => void;

export interface CartItemProps {
  id: UUID;
  name: string;
  details: string;
  addedIngredientsLine?: string;
  imgUrl: string;
  price: number;
  quantity: number;
  currency: string;
  onUpdateQuantity: onUpdateQuantityType;
}
