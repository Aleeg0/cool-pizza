import {useCallback, useState} from "react";
import {PriceRange, UUID} from "@/store/types/shared";

export const useFilters = () => {
  const [ingredientsIds, setIngredientsIds] = useState<UUID[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({});

  const stableSetPrice = useCallback(
    (price: PriceRange) => setPriceRange(price),
    []
  );

  const stableSetIngredients = useCallback(
    (ids: UUID[]) => setIngredientsIds(ids),
    []
  );

  return {
    ingredientsIds,
    priceRange,
    setPrice: stableSetPrice,
    setIngredients: stableSetIngredients,
  };
};