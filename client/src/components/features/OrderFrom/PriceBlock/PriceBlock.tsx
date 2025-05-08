'use client';

import React, {FC} from 'react';
import styles from './styles.module.scss';
import {UiButton} from "@/components/ui";
import PriceWidget from "@/components/features/OrderFrom/PriceWidget/PriceWidget";
import {BoxIcon} from "@/components/icons";

interface Props {
  totalAmount: number;
  currency: string;
  onOrderClick: () => void;
}

const PriceBlock: FC<Props> = ({
  totalAmount,
  currency,
  onOrderClick
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <h2>Итого: </h2>
            <b>{totalAmount} {currency}</b>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.main_priceWidget}>
            <PriceWidget
              caption="Стоимость товаров:"
              price={totalAmount}
              icon={<BoxIcon/>}
            />
          </div>
          <div className={styles.main_priceWidget}>
            <PriceWidget
              caption="Доставка:"
              price={0}
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