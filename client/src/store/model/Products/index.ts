export {
  default as ProductReducer,
  setFilters,
  setSortBy,
  setCurrentCategoryId
} from "./slice";

export {
  selectExistCategories,
  selectCurrentCategoryId,
  selectSortBy
} from './selectors';