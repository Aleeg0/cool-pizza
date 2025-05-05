import React from 'react';
import styles from './styles.module.scss';
import {useAppSelector} from "@/store/lib/hooks";
import {selectCartItemsCount} from "@/store/model/Cart";
import EmptyCartDrawer from "@/components/features/Cart/CartDrawers/EmptyCartDrawer/EmptyCartDrawer";
import CartDrawer from "@/components/features/Cart/CartDrawers/CartDrawer/CartDrawer";

const CartDrawerContainer = () => {
  const itemsCount = useAppSelector(selectCartItemsCount);

  return (
    <div className={styles.container}>
      {itemsCount > 0 ?
        <CartDrawer
          itemsCount={itemsCount}
        />
      :
        <EmptyCartDrawer/>
      }
    </div>
  );
};

export default CartDrawerContainer;