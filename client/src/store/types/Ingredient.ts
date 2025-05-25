import {UUID} from "./shared";

export interface Ingredient {
  id: UUID;
  name: string;
  imgUrl: string;
  price: number;
}
