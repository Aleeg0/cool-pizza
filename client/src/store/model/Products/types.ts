import {ItemsState} from "@/store/lib/types";
import {Product} from "@/store/types/Product";

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface Filters {
  priceRange: PriceRange;
  ingredients: string[];
}

export interface ProductsState extends ItemsState<Product>{
  filters: Filters,
  sortBy: string;
}