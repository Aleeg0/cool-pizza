'use client';

import React from 'react';
import {PizzaFilterState} from "./type";
import {RadioSlideSelector} from "@/components/features";
import styles from './styles.module.scss'
import {IngredientCatalog} from "@/components/entities/Ingredient";
import {ProductModal} from "@/components/entities/Product";
import {SmartDisplayer} from "@/components/ui";

const sizes = [
  {id: 0, value: "Маленькая", imgUrl: "/images/test.avif", isExist: true},
  {id: 1, value: "Средняя", imgUrl: "/images/testM.avif", isExist: true},
  {id: 2, value: "Большая", imgUrl: "/images/testM.avif", isExist: true},
];

const doughs = [
  {id: 0, value: "Традиционное", isExist: true},
  {id: 1, value: "Тонкое", isExist: true},
];

const initFilterState: PizzaFilterState = {
  size_id: 1,
  dough_id: 0,
  ingredients: []
}

const Modal = () => {
  const [pizzaFilter, setPizzaFilter] = React.useState<PizzaFilterState>(initFilterState);

  const setPizzaDough = (id: number) => {
    setPizzaFilter({
      ...pizzaFilter,
      dough_id: id
    });
  }

  const setPizzaSize = (id: number) => {
    setPizzaFilter({
      ...pizzaFilter,
      size_id: id
    });
  }

  const onCartButtonClick = () => {

  }

  return (
    <ProductModal
      title="Пепперони фреш"
      productProperty="25 см, традиционное тесто 25, 380 г"
      description="Соус ранч, моцарелла, ветчина , бекон , красный лук , маринованные огурчики , итальянские травы , соус горчичный"
      cartButtonCaption="Добавить в корзину за 799₽"
      onCartButtonClick={onCartButtonClick}
      imageVisualizer={
        <SmartDisplayer
          sizeId={pizzaFilter.size_id}
          imgUrl={sizes[pizzaFilter.size_id].imgUrl}
        />
      }
      content={
        <>
          <div className={styles.sliders}>
            <RadioSlideSelector
              items={sizes}
              selectedId={pizzaFilter.size_id}
              onSelect={setPizzaSize}
            />
            <RadioSlideSelector
              items={doughs}
              selectedId={pizzaFilter.dough_id}
              onSelect={setPizzaDough}
            />
          </div>
          <IngredientCatalog/>
        </>
      }
    />
  );
};

export default Modal;