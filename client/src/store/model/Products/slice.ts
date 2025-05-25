import {ProductsState} from "./types";
import {createSlice, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {SortByValues} from "@/store/consts/SortByValues";
import {Filters, LoadingStatus, UUID} from "@/store/types/shared";
import {fetchProductsGrouped} from "@/store/model/Products/thunk";
import {handlePending, handleRejected} from "@/store/model/Shared";

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
      .addCase(fetchProductsGrouped.fulfilled, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.SUCCEEDED;
          state.data = action.payload;
          state.currentCategoryId = action.payload.at(0)?.category.id;
        }
      })
      .addMatcher(isPending(fetchProductsGrouped), handlePending)
      .addMatcher(isRejected(fetchProductsGrouped), handleRejected);
  }
});

export const {
  setFilters,
  setSortBy,
  setCurrentCategoryId
} = productsSlice.actions;

export default productsSlice.reducer;