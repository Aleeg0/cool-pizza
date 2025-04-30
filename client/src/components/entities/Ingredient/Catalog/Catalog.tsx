import React, {FC} from 'react';
import {IngredientCard} from "@/components/entities/Ingredient";
import styles from './styles.module.scss'
import {Ingredient} from "@/store/types/Ingredient";

interface Props {
  ingredients: Ingredient[];
  selectedIds: string[];
  onSelect: (id: string) => void;
}

const Catalog: FC<Props> = ({ingredients, selectedIds, onSelect}) => {


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>Добавить по вкусу</h4>
      </div>
      <div className={styles.ingredients}>
        {ingredients.map((ingredient) =>
        <div
          key={ingredient.id}
          className={styles.ingredient}
        >
          <IngredientCard
            {...ingredient}
            currency="₽"
          />
        </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;