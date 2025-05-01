import {combineReducers} from "redux";
import {ingredientsReducer} from "@/store/model/Ingredients";
import {ProductReducer} from "@/store/model/Products";
import {CurrentProductReducer} from "@/store/model/CurrentProduct";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  products: ProductReducer,
  currentProduct: CurrentProductReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;