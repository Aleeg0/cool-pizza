import {PriceRange, resetFilters, selectFilters, setFilterIngredients, setFiltersPrice} from "../model/Products";
import {useCallback} from "react";
import {useAppDispatch, useAppSelector} from "../lib/hooks";

export const useFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const stableSetPrice = useCallback(
    (price: PriceRange) => dispatch(setFiltersPrice(price)),
    [dispatch]
  );

  const stableSetIngredients = useCallback(
    (ids: string[]) => dispatch(setFilterIngredients(ids)),
    [dispatch]
  );

  const stableResetFilters = useCallback(
    () => dispatch(resetFilters()),
    [dispatch]
  );

  return {
    filters,
    setPrice: stableSetPrice,
    setIngredients: stableSetIngredients,
    resetFilters: stableResetFilters,
  };
};