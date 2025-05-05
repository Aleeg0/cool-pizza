import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  AddGoodsToCartAction,
  AddPizzaToCartAction,
  Cart,
  UpdateCartItem,
  CartItem
} from "./types";
import cartApi from "@/store/apis/CartApi";
import {UUID} from "@/store/types/shared";

export const fetchCart = createAsyncThunk<
  Cart,
  void,
  { rejectValue: string }
>(
  "/cart/getCart",
  async (_, {rejectWithValue}) => {
    try {
      return await cartApi.getCartByToken();
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const getCartTotalAmount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>(
  "/cart/total-amount",
  async (_, {rejectWithValue}) => {
    try {
      return await cartApi.getCartTotalAmount();
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addPizzaToCart = createAsyncThunk<
  CartItem,
  AddPizzaToCartAction,
  { rejectValue: string }
>(
  "/cart/pizzas/add",
  async (addPizzaToCartAction, {rejectWithValue}) => {
    try {
      return await cartApi.addPizzaToCart(
        addPizzaToCartAction.pizzaId,
        addPizzaToCartAction.ingredientsIds
      );
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addGoodsToCart = createAsyncThunk<
  CartItem,
  AddGoodsToCartAction,
  { rejectValue: string }
>(
  "/cart/goods/add",
  async (addGoodsToCartAction, {rejectWithValue}) => {
    try {
      return await cartApi.addGoodsToCart(addGoodsToCartAction.goodsId);
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateCartPizza = createAsyncThunk<
  UpdateCartItem,
  UpdateCartItem,
  { rejectValue: string }
>(
  "/cart/pizzas/update",
  async (updateCartGoodsAction, {rejectWithValue}) => {
    try {
      return await cartApi.updateCartItem(
        updateCartGoodsAction.id,
        updateCartGoodsAction.quantity,
        "pizzas"
      );
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateCartGoods = createAsyncThunk<
  UpdateCartItem,
  UpdateCartItem,
  { rejectValue: string }
>(
  "/cart/goods/update",
  async (updateCartGoodsAction, {rejectWithValue}) => {
    try {
      return await cartApi.updateCartItem(
        updateCartGoodsAction.id,
        updateCartGoodsAction.quantity,
        "goods"
      );
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const removeCartPizza = createAsyncThunk<
  UUID,
  UUID,
  { rejectValue: string }
>(
  "/cart/pizzas/remove",
  async (id, {rejectWithValue}) => {
    try {
      await cartApi.removeCartPizza(id, "pizzas");
      return id;
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const removeCartGoods = createAsyncThunk<
  UUID,
  UUID,
  { rejectValue: string }
>(
  "/cart/goods/remove",
  async (id, {rejectWithValue}) => {
    try {
      await cartApi.removeCartPizza(id, "goods");
      return id;
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);