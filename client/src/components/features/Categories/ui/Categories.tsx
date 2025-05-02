'use client';

import React from 'react';
import {cn} from "@/utils";
import {useCategories} from "../lib/useCategories";
import CategoriesDropdown from "./CategoriesDropdown";
import styles from './Categories.module.scss';

const Categories = () => {
  const {categories, currentCategoryId, visibleCount, selectCategory} = useCategories();

  const visibleCategories = categories.slice(0, visibleCount);
  const dropdownCategories = categories.slice(visibleCount);

  return (
    <nav className={styles.Categories_container}>
      <ul className={styles.Categories_itemList}>
        {visibleCategories.map((item) =>
        <li
          className={styles.Categories_item}
          key={item.id}
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
            selectedId={currentCategoryId!}
            onSelect={selectCategory}
          />
        )}
      </ul>
    </nav>
  );
};

export default Categories;