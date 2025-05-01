import {RootState} from "@/store/rootReducer";

export const selectSortBy = (state: RootState) => state.products.sortBy;