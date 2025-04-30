import {RootState} from "@/store/rootReducer";

export const selectIngredients = (state: RootState) => state.ingredients.items;