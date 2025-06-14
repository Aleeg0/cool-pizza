import {createSlice, isPending, isRejected} from "@reduxjs/toolkit";
import {Cart, CartItem, CartState} from "./types";
import {LoadingStatus} from "@/store/types/shared";
import {
  addGoodsToCart,
  addPizzaToCart,
  fetchCart, getCartTotalAmount,
  removeCartGoods, removeCartPizza, submitOrder,
  updateCartGoods,
  updateCartPizza
} from "@/store/model/Cart/thunk";
import {handleFulfilled, handlePending, handleRejected} from "@/store/model/Shared";
import {deleteItem, updateQuantity, upsertItem} from "@/store/model/Cart/handlers";

const cartInitState: Cart = {
  totalAmount: 0,
  goodsCartLines: [],
  pizzaCartLines: []
}

const initialState: CartState = {
  data: cartInitState,
  status: LoadingStatus.IDLE,
  error: undefined
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get methods
      .addCase(fetchCart.fulfilled, (state, action) =>
        handleFulfilled(state, () => {
          if (action.payload != null)
            state.data = action.payload;
        })
      )
      .addCase(getCartTotalAmount.fulfilled, (state, action) => {
        state.data.totalAmount = action.payload;
      })
      // submit order
      .addCase(submitOrder.fulfilled, (state) =>
        handleFulfilled(state, () => {
          state.data = cartInitState;
        })
      )
      // pizza
      .addCase(addPizzaToCart.fulfilled, (state, action) =>
        handleFulfilled(state, () => {
          upsertItem<CartItem>(state.data.pizzaCartLines, action.payload);
        })
      )
      .addCase(updateCartPizza.fulfilled, (state, action) =>
        handleFulfilled(state, () => {
          updateQuantity<CartItem>(state.data.pizzaCartLines, action.payload.id, action.payload.quantity);
        })
      )
      .addCase(removeCartPizza.fulfilled, (state, action) =>
        handleFulfilled(state, () => {
          deleteItem<CartItem>(state.data.pizzaCartLines, action.payload);
        })
      )
      // goods
      .addCase(addGoodsToCart.fulfilled, (state, action) =>
        handleFulfilled(state, () => {
          upsertItem<CartItem>(state.data.goodsCartLines, action.payload);
        })
      )
      .addCase(updateCartGoods.fulfilled, (state, action) =>
        handleFulfilled(state, () => {
          updateQuantity<CartItem>(state.data.goodsCartLines, action.payload.id, action.payload.quantity);
        })
      )
      .addCase(removeCartGoods.fulfilled, (state, action) => {
        handleFulfilled(state, () => {
          deleteItem<CartItem>(state.data.goodsCartLines, action.payload);
        })
        }
      )
      .addMatcher(isPending(
          fetchCart, getCartTotalAmount, submitOrder, addPizzaToCart, updateCartPizza, removeCartPizza,
          addGoodsToCart, updateCartGoods, removeCartGoods
        ), handlePending
      )
      .addMatcher(isRejected(
        fetchCart, getCartTotalAmount, submitOrder, addPizzaToCart, updateCartPizza, removeCartPizza,
        addGoodsToCart, updateCartGoods, removeCartGoods
      ), handleRejected);
  }
});

export default cartSlice.reducer;