import {ProductsState} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortByValues} from "@/store/consts/SortByValues";
import {Filters, LoadingStatus, UUID} from "@/store/types/shared";
import {fetchProductsGrouped} from "@/store/model/Products/thunk";

const initSortBy = SortByValues.NEWEST;

const initFilters: Filters = {
  priceRange: {},
  ingredientsIds: []
};

const initialState: ProductsState = {
  data: [],
  currentCategoryId: undefined,
  filters: initFilters,
  sortBy: initSortBy,
  status: LoadingStatus.IDLE,
  error: undefined,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setCurrentCategoryId: (state, action: PayloadAction<UUID>) => {
      state.currentCategoryId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsGrouped.pending, (state) => {
        if (state.status === LoadingStatus.IDLE) {
          state.status = LoadingStatus.PENDING;
        }
      })
      .addCase(fetchProductsGrouped.fulfilled, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.SUCCEEDED;
          state.data = action.payload;
          state.currentCategoryId = action.payload.at(0)?.category.id;
        }
      })
      .addCase(fetchProductsGrouped.rejected, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.FAILED;
          state.error = action.error.message;
        }
      });
  }
});

export const {
  setFilters,
  setSortBy,
  setCurrentCategoryId
} = productsSlice.actions;

export default productsSlice.reducer;