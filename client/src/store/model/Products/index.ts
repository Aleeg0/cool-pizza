export {
  selectGroupedProducts,
  selectFilters,
  selectSortBy
} from './selectors';

export {
  default as ProductReducer,
  setFiltersPrice,
  setFilterIngredients,
  resetFilters
} from './slice';

export type {
  Filters,
  PriceRange
} from './types';