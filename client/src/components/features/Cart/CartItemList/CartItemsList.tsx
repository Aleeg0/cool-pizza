import React, {FC} from 'react';
import styles from './styles.module.scss'
import {CartItemProps} from "../types";
import CartItem from "../CartItem/CartItem";


interface Props {
  cartItems: CartItemProps[];
}

const CartItemsList: FC<Props> = ({
  cartItems
}) => {

  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        {cartItems.map((item) =>
          <li
            className={styles.listItem}
            key={item.id}
          >
            <CartItem {...item}/>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CartItemsList;