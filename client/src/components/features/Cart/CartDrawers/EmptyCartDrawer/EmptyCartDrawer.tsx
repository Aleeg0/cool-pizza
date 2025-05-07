import React from 'react';
import styles from './styles.module.scss';
import {CartIcon} from "@/components/icons";

const EmptyCartDrawer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <CartIcon/>
        </div>
        <div className={styles.title}>
          <h3>Корзина пустая</h3>
        </div>
        <div className={styles.information}>
          <p>Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartDrawer;