import React, {FC} from 'react';
import BlockContainer from "@/components/features/OrderFrom/BlockContainer/BlockContainer";
import {OrderCard} from '@/components/entities/Order'
import styles from "./styles.module.scss";
import {CartItem} from "@/store/model/Cart";

interface Props {
  cartItems: CartItem[];
}

const CartBlock: FC<Props> = ({cartItems}) => {
  return (
    <BlockContainer
      title="1. Корзина"
    >
      <div className={styles.content}>
        <ul className={styles.orderItems}>
          {cartItems.map((item) =>
            <li
              className={styles.orderItem}
              key={item.id}
            >
              <OrderCard
                currency={'руб.'}
                {...item}
              />
            </li>
          )}
        </ul>
      </div>
    </BlockContainer>
  );
};

export default CartBlock;