import {IngredientsState} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {Ingredient} from "@/store/types/Ingredient";
import {LoadingStatus} from "@/store/types/shared";
import {fetchIngredients} from "@/store/model/Ingredients/thunk";
import {handlePending, handleRejected, isPendingAction, isRejectedAction} from "@/store/model/Shared";

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
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectedAction, handleRejected);
  }
});

export default ingredientsSlice.reducer;