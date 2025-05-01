'use client';

import React, {FC} from 'react';
import {ProductModal} from "@/components/entities/Product";
import {RadioSelector} from "@/components/ui";
import {SmartDisplayer} from "@/components/ui";
import styles from '../Modal/styles.module.scss'
import {Product, Goods} from "@/store/types/Product";

interface Props {
  product: Product;
}

const SimpleModal: FC<Props> = ({product}) => {
  const {details, weight, price, imgUrl} = product.variations![0] as Goods;
  const productDetails = `${details} ${weight} г.`;

  return (
    <ProductModal
      title={product.name}
      description={product.description}
      productDetails={productDetails}
      cartButtonCaption={`Добавить в корзину за ${price} ₽`}
      onCartButtonClick={() => {}}
      imageVisualizer={
        <SmartDisplayer
          sizeId={2}
          imgUrl={imgUrl}
        />
      }
      content={
        <div className={styles.simpleContent}>
          <RadioSelector caption={details}/>
        </div>
      }
    />
  );
};

export default SimpleModal;