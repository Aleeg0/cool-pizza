'use client';

import React, {useState} from 'react';
import styles from './Categories.module.scss'
import {cn} from "@/utils";
import {scrollToSection} from "./scrollToSection";

const arr = [
  {name: "meat", value: "Мясные"},
  {name: "spicy", value: "Острые"},
  {name: "sweet", value: "Сладкие"},
  {name: "vegetarian", value: "Вегетарианские"},
  {name: "with_chicken", value: "С курицей"},
]

const Categories = () => {
  const [curCategoryId, setCurCategoryId] = useState<number>(0);

  const onSelect = (item: string, index: number) => {
    setCurCategoryId(index);
    scrollToSection(item);
  }

  return (
    <nav className={styles.Categories_container}>
      <ul className={styles.Categories_content}>
        {arr.map((item, i) =>
        <li
          className={cn(
            styles.Categories_item,
            curCategoryId === i ? styles.Categories_item__active : ''
          )}
          key={i}
        >
          <button
            onClick={() => onSelect(item.name,i)}
          >
            {item.value}
          </button>
        </li>
        )}
      </ul>
    </nav>
  );
};

export default Categories;