'use client';

import React from 'react';
import styles from './Categories.module.scss'
import {cn} from "@/utils";
import CategoriesDropdown from "@/components/features/Categories/ui/CategoriesDropdown";
import {Category} from "@/components/features/Categories/lib/Category";
import {useCategories} from "@/components/features/Categories/lib/useCategories";

const categoryData: Category[] = [
  {id: 1, name: "meat", value: "Мясные"},
  {id: 2, name: "spicy", value: "Острые"},
  {id: 3, name: "sweet", value: "Сладкие"},
  {id: 4, name: "vegetarian", value: "Вегетарианские"},
  {id: 5, name: "with_chicken", value: "С курицей"},
  {id: 6, name: "belarusian", value: "Белорусские"},
  {id: 7, name: "foreign", value: "Зарубежные"},
]

const Categories = () => {
  const {categories, currentCategoryId, visibleCount, selectCategory} = useCategories(categoryData);

  const visibleCategories = categories.slice(0, visibleCount);
  const dropdownCategories = categories.slice(visibleCount);

  return (
    <nav className={styles.Categories_container}>
      <ul className={styles.Categories_itemList}>
        {visibleCategories.map((item, i) =>
        <li
          className={styles.Categories_item}
          key={i}
        >
          <button
            className={cn(
              styles.Categories_button,
              currentCategoryId === item.id ? styles.Categories_button__active : ''
            )}
            onClick={() => selectCategory(item)}
          >
            {item.value}
          </button>
        </li>
        )}
        {dropdownCategories.length > 0 && (
          <CategoriesDropdown
            categories={dropdownCategories}
            selectedId={currentCategoryId}
            onSelect={selectCategory}
          />
        )}
      </ul>
    </nav>
  );
};

export default Categories;