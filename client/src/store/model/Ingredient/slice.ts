import {IngredientsState} from "./types";

import {createSlice} from "@reduxjs/toolkit";
import {LoadingStatus} from "@/store/lib/enums";
import {Ingredient} from "@/store/types/Ingredient";

const ingredients: Ingredient[] = [
  {id: "1", name: "Ingredient 1", imgUrl: "", price: 0},
  {id: "2", name: "Ingredient 2", imgUrl: "", price: 0},
  {id: "3", name: "Ingredient 3", imgUrl: "", price: 0},
  {id: "4", name: "Ingredient 4", imgUrl: "", price: 0},
  {id: "5", name: "Ingredient 5", imgUrl: "", price: 0},
  {id: "6", name: "Ingredient 6", imgUrl: "", price: 0},
  {id: "7", name: "Ingredient 7", imgUrl: "", price: 0},
  {id: "8", name: "Ingredient 8", imgUrl: "", price: 0},
  {id: "9", name: "Ingredient 9", imgUrl: "", price: 0},
  {id: "10", name: "Ingredient 10", imgUrl: "", price: 0},
  {id: "11", name: "Ingredient 11", imgUrl: "", price: 0},
  {id: "12", name: "Ingredient 12", imgUrl: "", price: 0},
  {id: "13", name: "Ingredient 13", imgUrl: "", price: 0},
  {id: "14", name: "Ingredient 14", imgUrl: "", price: 0},
  {id: "15", name: "Ingredient 15", imgUrl: "", price: 0},
  {id: "16", name: "Ingredient 15", imgUrl: "", price: 0},
];


const initialState: IngredientsState = {
  items: ingredients,
  status: LoadingStatus.IDLE,
  error: null
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {

  }
});

export default ingredientsSlice.reducer;