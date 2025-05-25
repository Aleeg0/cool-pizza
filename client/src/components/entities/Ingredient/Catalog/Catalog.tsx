import React, {FC} from 'react';
import {IngredientCard} from "@/components/entities/Ingredient";
import styles from './styles.module.scss'
import {Ingredient} from "@/store/types/Ingredient";
import {UUID} from "@/store/types/shared";
import {cn} from "@/utils";

interface Props {
  ingredients: Ingredient[];
  selectedIds: UUID[];
  onSelect: (id: UUID) => void;
}

const Catalog: FC<Props> = ({ingredients, selectedIds, onSelect}) => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>Добавить по вкусу</h4>
      </div>
      <div className={styles.ingredients}>
        {ingredients.map((ingredient) =>
          <IngredientCard
            {...ingredient}
            currency="руб."
            key={ingredient.id}
            onClick={() => onSelect(ingredient.id)}
            className={cn(
              styles.ingredient,
              selectedIds.includes(ingredient.id) ? styles.ingredient_active : ''
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Catalog;