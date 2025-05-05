import {combineReducers} from "redux";
import {ingredientsReducer} from "@/store/model/Ingredients";
import {ProductReducer} from "@/store/model/Products";
import {CurrentProductReducer} from "@/store/model/CurrentProduct";
import {CartReducer} from "@/store/model/Cart";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  products: ProductReducer,
  currentProduct: CurrentProductReducer,
  cart: CartReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;