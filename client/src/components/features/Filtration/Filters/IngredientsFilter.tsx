'use client';

import React, {FC, useState} from 'react';
import styles from "@/components/features/Filtration/Filtration.module.scss";
import {UiCheckbox} from "@/components/ui";
import {InlineButton} from "@/components/ui/Buttons";
import {Ingredient} from "@/store/types/Ingredient";

interface Props {
  ingredients: Ingredient[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

const VISIBLE_STEP = 6;

const IngredientsFilter: FC<Props> = ({
  ingredients,
  selectedIds,
  onSelectionChange,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(VISIBLE_STEP);

  const onCategoryClick = (id: string) => {
    const newSelectedIds = selectedIds.includes(id)
      ? [...selectedIds].filter(i => i !== id)
      : [...selectedIds, id];

    onSelectionChange(newSelectedIds);
  }

  const showMore = () => {
    setVisibleCount(v => Math.min(v + VISIBLE_STEP, ingredients.length));
  }

  const showLess = () => {
    setVisibleCount(v => Math.max(VISIBLE_STEP, v - VISIBLE_STEP));
  }

  const visibleIngredients: Ingredient[] = ingredients.slice(0, visibleCount);

  return (
    <div className={styles.IngredientsFilter_content}>
      <ul className={styles.IngredientsFilter_itemList}>
        {visibleIngredients.map((ingredient: Ingredient) =>
          <li
            className={styles.IngredientsFilter_item}
            key={ingredient.id}
          >
            <UiCheckbox
              caption={ingredient.name}
              isChecked={selectedIds.includes(ingredient.id)}
              onChecked={() => onCategoryClick(ingredient.id)}
            />
          </li>
        )}
      </ul>

      <div className={styles.IngredientsFilter_controls}>
        {visibleIngredients.length < ingredients.length &&
          <InlineButton
            caption="больше"
            onClick={showMore}
            withAnimation={true}
          />
        }
        {visibleIngredients.length > 6 &&
          <InlineButton
              caption="меньше"
              onClick={showLess}
              withAnimation={true}
          />
        }
      </div>
    </div>
  );
};

export default IngredientsFilter;