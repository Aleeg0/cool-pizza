import {combineReducers} from "redux";
import {ProductReducer} from "./model/Products";
import {CategoriesReducer} from "@/store/model/Categories";
import {ingredientsReducer} from "@/store/model/Ingredient";

const rootReducer = combineReducers({
  products: ProductReducer,
  categories: CategoriesReducer,
  ingredients: ingredientsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;