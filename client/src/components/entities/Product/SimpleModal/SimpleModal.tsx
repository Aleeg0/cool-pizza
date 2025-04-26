'use client';

import React from 'react';
import {ProductModal} from "@/components/entities/Product";
import {RadioSelector} from "@/components/ui";
import {SmartDisplayer} from "@/components/ui";
import styles from '../Modal/styles.module.scss'

const SimpleModal = () => {

  const onCartButtonClick = () => {
    console.log("Hello")
  }

  return (
    <ProductModal
      title="Молочный коктейль Фисташка"
      productProperty="0,3 л, 320 г"
      description="Сочетание нежности, сливочной текстуры и тонкого вкуса фисташки"
      cartButtonCaption="Добавить в корзину за 799₽"
      onCartButtonClick={onCartButtonClick}
      imageVisualizer={
        <SmartDisplayer
          sizeId={2}
          imgUrl={"/images/testProduct.avif"}
        />
      }
      content={
        <div className={styles.simpleContent}>
          <RadioSelector caption="1 шт."/>
        </div>
      }
    />
  );
};

export default SimpleModal;