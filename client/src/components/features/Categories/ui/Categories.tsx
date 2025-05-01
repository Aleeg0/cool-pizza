'use client';

import React, {FC} from 'react';
import {cn} from "@/utils";
import {useCategories} from "../lib/useCategories";
import CategoriesDropdown from "./CategoriesDropdown";
import styles from './Categories.module.scss';
import {Category} from "@/store/types/Category";

interface Props {
  categoriesData: Category[];
}

const Categories: FC<Props> = ({categoriesData}) => {
  const {categories, currentCategoryId, visibleCount, selectCategory} = useCategories(categoriesData);

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