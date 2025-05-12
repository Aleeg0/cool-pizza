import {OrderState} from "./types";
import {LoadingStatus} from "@/store/types/shared";
import {createSlice} from "@reduxjs/toolkit";
import {fetchOrders} from "./thunk";
import {handleFulfilled, handlePending, handleRejected} from "@/store/model/Shared";

const initialState: OrderState = {
  data: [],
  status: LoadingStatus.IDLE,
  error: undefined,
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, handlePending)
      .addCase(fetchOrders.fulfilled, (state, action) =>
        handleFulfilled(state, () => {
          state.data = action.payload;
        })
      )
      .addCase(fetchOrders.rejected, handleRejected)
  }
})

export default orderSlice.reducer;