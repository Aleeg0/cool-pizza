import {IngredientsState} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {Ingredient} from "@/store/types/Ingredient";
import {LoadingStatus} from "@/store/types/shared";
import {fetchIngredients} from "@/store/model/Ingredients/thunk";

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
      .addCase(fetchIngredients.pending, (state) => {
        if (state.status === LoadingStatus.IDLE) {
          state.status = LoadingStatus.PENDING;
        }
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.SUCCEEDED;
          state.data = action.payload;
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.FAILED;
          state.error = action.error.message;
        }
      });
  }
});

export default ingredientsSlice.reducer;