import React from 'react';
import BlockContainer from "@/components/features/OrderFrom/BlockContainer/BlockContainer";
import {OrderCard} from '@/components/entities/Order'
import styles from "./styles.module.scss";

const CartBlock = () => {
  return (
    <BlockContainer
      title="1. Корзина"
    >
      <div className={styles.container}>
        <ul className={styles.orderItems}>
          <li className={styles.orderItem}>
            <OrderCard
              name="Чизбургер-пицца"
              details="Средняя 30 см, традиционное тесто"
              price={965}
              currency="руб."
              quantity={2}
              imgUrl="https://media.dodostatic.net/image/r:366x366/11eef45fda55224990fb822cd755bf1a.avif"
            />
          </li>
          <li className={styles.orderItem}>
            <OrderCard
              name="Чизбургер-пицца"
              details="Средняя 30 см, традиционное тесто"
              price={965}
              currency="руб."
              quantity={2}
              imgUrl="https://media.dodostatic.net/image/r:366x366/11eef45fda55224990fb822cd755bf1a.avif"
            />
          </li>
        </ul>
      </div>
    </BlockContainer>
  );
};

export default CartBlock;