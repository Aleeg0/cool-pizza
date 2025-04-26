export interface PriceRange {
  min: number;
  max: number;
}

export interface FiltersState {
  ingredients: number[];
  price: PriceRange;
}