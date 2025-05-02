import {CurrentProductState} from "@/store/model/CurrentProduct/types";
import {createSlice} from "@reduxjs/toolkit";
import {LoadingStatus} from "@/store/types/shared";
import {fetchCurrentProduct} from "@/store/model/CurrentProduct/thunk";

const initialState: CurrentProductState = {
  data: undefined,
  currentProductId: undefined,
  status: LoadingStatus.IDLE,
  error: undefined,
};

const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentProduct.pending, (state) => {
          if (state.status === LoadingStatus.IDLE) {
            state.status = LoadingStatus.PENDING;
            state.data = undefined;
          }
        })
      .addCase(fetchCurrentProduct.fulfilled, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.SUCCEEDED;
          state.data = action.payload;
        }
      })
      .addCase(fetchCurrentProduct.rejected, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.FAILED;
          state.error = action.error.message;
        }
      })
  }
});



export default currentProductSlice.reducer;