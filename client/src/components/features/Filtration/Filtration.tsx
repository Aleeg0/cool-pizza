'use client';

import React, {useEffect} from 'react';
import styles from './Filtration.module.scss'
import PriceFilter from "./Filters/PriceFilter";
import IngredientsFilter from "./Filters/IngredientsFilter";
import FilterLayout from "@/components/features/Filtration/Filters/FilterLayout";
import {UiButton} from "@/components/ui/Buttons";
import {useAppSelector} from "@/store/lib/hooks";
import {selectIngredients} from "@/store/model/Ingredient";
import {useFilters} from "@/store/hooks";

const Filtration = () => {
  const ingredients = useAppSelector(selectIngredients);
  const {filters, resetFilters, setPrice, setIngredients} = useFilters();

  const onAcceptFilters = () => {
    console.log("Accept Filters");
  }

  // when user load page reset filters
  useEffect(() => {
    resetFilters();
  },[resetFilters]);

  return (
    <div className={styles.Filtration_content}>
      <div className={styles.Filtration_title}>
        <h3>Фильтрация</h3>
      </div>
      <div>
        <FilterLayout title="Цена от и до:">
          <PriceFilter
            currentPrice={filters.priceRange}
            onPriceChange={setPrice}
          />
        </FilterLayout>
        <FilterLayout title="Цена от и до:">
          <IngredientsFilter
            ingredients={ingredients}
            onSelectionChange={setIngredients}
            selectedIds={filters.ingredients}
          />
        </FilterLayout>
      </div>
      <div>
        <UiButton
          caption="Применить"
          isFullWidth={true}
          onClick={onAcceptFilters}
          disabled={!!(filters.priceRange.min && filters.priceRange.max && filters.priceRange.min > filters.priceRange.max)}
        />
      </div>
    </div>
  );
};

export default Filtration;