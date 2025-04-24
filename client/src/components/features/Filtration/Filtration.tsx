'use client';

import React, {useState} from 'react';
import styles from './Filtration.module.scss'
import {FiltersState, Ingredient, PriceRange} from "./types";
import PriceFilter from "./Filters/PriceFilter";
import IngredientsFilter from "./Filters/IngredientsFilter";
import FilterLayout from "@/components/features/Filtration/Filters/FilterLayout";
import {UiButton} from "@/components/ui/Buttons";

const ingredients: Ingredient[] = [
  {id: 1, name: "Ingredient 1"},
  {id: 2, name: "Ingredient 2"},
  {id: 3, name: "Ingredient 3"},
  {id: 4, name: "Ingredient 4"},
  {id: 5, name: "Ingredient 5"},
  {id: 6, name: "Ingredient 6"},
  {id: 7, name: "Ingredient 7"},
  {id: 8, name: "Ingredient 8"},
  {id: 9, name: "Ingredient 9"},
  {id: 10, name: "Ingredient 10"},
  {id: 11, name: "Ingredient 11"},
  {id: 12, name: "Ingredient 12"},
  {id: 13, name: "Ingredient 13"},
  {id: 14, name: "Ingredient 14"},
  {id: 15, name: "Ingredient 15"},
  {id: 16, name: "Ingredient 15"},
];

const Filtration = () => {

  const [filters, setFilters] = useState<FiltersState>({
    ingredients: [],
    price: {min: 0, max: 57}
  });

  const handleIngredientsChange = (selectedIds: number[]) => {
    setFilters(prev => ({
      ...prev,
      ingredients: selectedIds
    }));
  };

  const handlePriceChange = (price: PriceRange) => {
    setFilters(prev => ({
      ...prev,
      price
    }));
  };

  const onAcceptFilters = () => {
    console.log(filters);
  }

  return (
    <div className={styles.Filtration_content}>
      <div className={styles.Filtration_title}>
        <h3>Фильтрация</h3>
      </div>
      <div>
        <FilterLayout title="Цена от и до:">
          <PriceFilter
            onPriceChange={handlePriceChange}
            currentPrice={filters.price}
          />
        </FilterLayout>
        <FilterLayout title="Цена от и до:">
          <IngredientsFilter
            ingredients={ingredients}
            selectedIds={filters.ingredients}
            onSelectionChange={handleIngredientsChange}
          />
        </FilterLayout>
      </div>
      <div>
        <UiButton
          caption="Применить"
          isFullWidth={true}
          onClick={onAcceptFilters}
          disabled={filters.price.min > filters.price.max}
        />
      </div>
    </div>
  );
};

export default Filtration;