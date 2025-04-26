import {Ingredient} from "@/store/model/Ingredient/types";

export interface PizzaFilterState {
  size_id: number;
  dough_id: number;
  ingredients: Ingredient[];
}