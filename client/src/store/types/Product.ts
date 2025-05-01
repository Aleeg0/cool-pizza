import {UUID} from "./shared";
import {Ingredient} from "./Ingredient";
import {Category} from "./Category";

export interface Goods {
  imgUrl: string;
  price: number;
  details: string;
  weight: number;
  product_id: string;
}

export interface Pizza {
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
  goods = "goods"
}

export interface Product {
  id: UUID;
  name: string;
  description: string;
  baseImg: string;
  minPrice: number;
  type?: ProductTypes;
  categoryId: string;
  variations: Goods[] | Pizza[]
}

export interface GroupedProduct {
  category: Category;
  products: Product[];
}