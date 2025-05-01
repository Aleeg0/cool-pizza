'use client';

import React from 'react';
import styles from './Filtration.module.scss'
import PriceFilter from "./Filters/PriceFilter";
import IngredientsFilter from "./Filters/IngredientsFilter";
import FilterLayout from "@/components/features/Filtration/Filters/FilterLayout";
import {UiButton} from "@/components/ui/Buttons";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {selectIngredients} from "@/store/model/Ingredients";
import {setFilters} from "@/store/model/Products";
import {useFilters} from "./lib/useFilters";

const Filtration = () => {
  const ingredients = useAppSelector(selectIngredients);
  const {priceRange, ingredientsIds, setPrice, setIngredients} = useFilters();
  const dispatch = useAppDispatch();

  const onAcceptFilters = () => {
    dispatch(setFilters({
      priceRange,
      ingredientsIds
    }));
  }

  return (
    <div className={styles.Filtration_content}>
      <div className={styles.Filtration_title}>
        <h3>Фильтрация</h3>
      </div>
      <div>
        <FilterLayout title="Цена от и до:">
          <PriceFilter
            currentPrice={priceRange}
            onPriceChange={setPrice}
          />
        </FilterLayout>
        <FilterLayout title="Ингредиенты:">
          <IngredientsFilter
            ingredients={ingredients}
            onSelectionChange={setIngredients}
            selectedIds={ingredientsIds}
          />
        </FilterLayout>
      </div>
      <div>
        <UiButton
          caption="Применить"
          isFullWidth={true}
          onClick={onAcceptFilters}
          disabled={!!(priceRange.min && priceRange.max && priceRange.min > priceRange.max)}
        />
      </div>
    </div>
  );
};

export default Filtration;