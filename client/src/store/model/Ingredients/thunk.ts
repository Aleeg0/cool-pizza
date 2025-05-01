import {createAsyncThunk} from "@reduxjs/toolkit";
import {Ingredient} from "@/store/types/Ingredient";
import ingredientsApi from "@/store/apis/IngredientsApi";


export const fetchIngredients = createAsyncThunk<
  Ingredient[],
  void
>(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const response = await ingredientsApi.getIngredients();
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
)