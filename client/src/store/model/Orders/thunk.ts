import {createAsyncThunk} from "@reduxjs/toolkit";
import {Order} from './types';
import cartApi from "@/store/apis/CartApi";

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>(
  "/orders/getOrders",
  async (_, {rejectWithValue}) => {
    try {
      const response = await cartApi.getOrders();
      return response.orders;
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
