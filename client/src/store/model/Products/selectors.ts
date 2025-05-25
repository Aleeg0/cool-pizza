import {RootState} from "@/store/rootReducer";
import {createSelector} from "reselect";
import {GroupedProduct} from "@/store/types/Product";

export const selectExistCategories = createSelector(
  (state: RootState) => state.products.data,
  (data: GroupedProduct[]) =>
    data.length > 0
      ? data.map((group) => group.category)
      : []
);

export const selectCurrentCategoryId = (state: RootState) => state.products.currentCategoryId;
export const selectSortBy = (state: RootState) => state.products.sortBy;