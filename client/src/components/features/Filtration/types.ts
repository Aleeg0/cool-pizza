export interface Ingredient {
  id: number;
  name: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface FiltersState {
  ingredients: number[];
  price: PriceRange;
}