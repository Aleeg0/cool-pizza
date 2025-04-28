import {CategoryState} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {LoadingStatus} from "@/store/lib/enums";
import {Category} from "@/store/types/category";

const categoryData: Category[] = [
  {id: "1", name: "meat", value: "Мясные"},
  {id: "2", name: "spicy", value: "Острые"},
  {id: "3", name: "sweet", value: "Сладкие"},
  {id: "4", name: "vegetarian", value: "Вегетарианские"},
  {id: "5", name: "with_chicken", value: "С курицей"},
  {id: "6", name: "belarusian", value: "Белорусские"},
  {id: "7", name: "foreign", value: "Зарубежные"},
]

const initialState: CategoryState = {
  items: categoryData,
  status: LoadingStatus.IDLE,
  error: null
}

const productsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {

  }
});

export default productsSlice.reducer;