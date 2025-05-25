import {IngredientsState} from "./types";
import {createSlice, isPending, isRejected} from "@reduxjs/toolkit";
import {LoadingStatus} from "@/store/types/shared";
import {fetchIngredients} from "@/store/model/Ingredients/thunk";
import {handlePending, handleRejected} from "@/store/model/Shared";

const initialState: IngredientsState = {
  data: [],
  status: LoadingStatus.IDLE,
  error: undefined
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.SUCCEEDED;
          state.data = action.payload;
        }
      })
      .addMatcher(isPending(fetchIngredients), handlePending)
      .addMatcher(isRejected(fetchIngredients), handleRejected);
  }
});

export default ingredientsSlice.reducer;