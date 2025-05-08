'use client';

import React from 'react';
import styles from './styles.module.scss';
import {UiButton} from "@/components/ui";
import PriceWidget from "@/components/features/OrderFrom/PriceWidget/PriceWidget";
import {BoxIcon} from "@/components/icons";
import {useAppDispatch} from "@/store/lib/hooks";
import {validateOrderForm} from "@/store/model/OrderForm";

const PriceBlock = () => {
  const dispatch = useAppDispatch();

  const onOrderClick = () => {
    dispatch(validateOrderForm());
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <h2>Итого: </h2>
            <b>2365 руб.</b>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.main_priceWidget}>
            <PriceWidget
              caption="Стоимость товаров:"
              price={2005}
              icon={<BoxIcon/>}
            />
          </div>
          <div className={styles.main_priceWidget}>
            <PriceWidget
              caption="Доставка:"
              price={2005}
              icon={<BoxIcon/>}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <UiButton
            onClick={onOrderClick}
            caption="Оформить"
            isFullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default PriceBlock;