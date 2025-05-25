'use client';

import React, {useEffect, useState} from 'react';
import {UiButton} from "@/components/ui";
import {Drawer} from "@/components/layout";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {fetchCart, selectCartItemsCount} from "@/store/model/Cart";
import styles from "./styles.module.scss";
import CartDrawer from "@/components/features/Cart/CartDrawers/CartDrawer/CartDrawer";
import EmptyCartDrawer from "@/components/features/Cart/CartDrawers/EmptyCartDrawer/EmptyCartDrawer";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const itemsCount = useAppSelector(selectCartItemsCount);
  const cartCaption = "Корзина" + `${itemsCount === 0 ? '' : ` ${itemsCount}`}`;

  useEffect(() => {
    dispatch(fetchCart());
  },[dispatch])

  return (
    <div>
      <UiButton
        onClick={() => setIsOpen(true)}
        caption={cartCaption}
      />
      {isOpen &&
        <Drawer
          onClose={() => setIsOpen(false)}
        >
          <div className={styles.container}>
            {itemsCount > 0 ?
              <CartDrawer
                itemsCount={itemsCount}
              />
              :
              <EmptyCartDrawer/>
            }
          </div>
        </Drawer>
      }
    </div>
  );
};

export default CartButton;