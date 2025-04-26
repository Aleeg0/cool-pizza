import React from 'react';
import {IngredientCard} from "@/components/entities/Ingredient";
import styles from './styles.module.scss'

const Catalog = () => {


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>Добавить по вкусу</h4>
      </div>
      <div className={styles.ingredients}>
        {Array.from(Array(10).keys()).map((_, i) =>
        <div
          key={i}
          className={styles.ingredient}
        >
          <IngredientCard
            name="Сырный бортик"
            imgUrl="/images/testIngredient.png"
            price={179}
            currency="₽"
          />
        </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;