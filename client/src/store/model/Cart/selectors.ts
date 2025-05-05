import {RootState} from "@/store/rootReducer";
import {createSelector} from "reselect";
import {Cart} from "@/store/model/Cart/types";

export const selectCart = (state: RootState) => state.cart.data;

export const selectCartItemsCount = createSelector(
  selectCart,
  (cart: Cart) => cart.goodsCartLines.length + cart.pizzaCartLines.length
);

