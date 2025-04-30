import {UUID} from "./shared";
import {Ingredient} from "./Ingredient";

export interface RegularProduct {
  imgUrl: string;
  price: number;
  details: string;
  weight: number;
  product_id: string;
}

export interface PizzaProduct {
  imgUrl: string;
  price: number;
  size: number;
  dough: string;
  weight: number;
  product_id: UUID;
  ingredients: Ingredient[];
}

export enum ProductTypes {
  pizza = "pizza",
  simpleProduct = "simpleProduct"
}

export interface Product {
  id: UUID;
  name: string;
  description: string;
  baseImgUrl: string;
  minPrice: number;
  type: ProductTypes;
  categoryId: string;
  variations?: RegularProduct[] | PizzaProduct[]
}