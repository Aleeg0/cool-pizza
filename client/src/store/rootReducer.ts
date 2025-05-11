import {combineReducers} from "redux";
import {ingredientsReducer} from "@/store/model/Ingredients";
import {ProductReducer} from "@/store/model/Products";
import {CurrentProductReducer} from "@/store/model/CurrentProduct";
import {CartReducer} from "@/store/model/Cart";
import {UserReducer} from "@/store/model/User";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  products: ProductReducer,
  currentProduct: CurrentProductReducer,
  cart: CartReducer,
  user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;