'use client';

import React, {useEffect, useState} from 'react';
import {UiButton} from "@/components/ui";
import {Drawer} from "@/components/layout";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {fetchCart, selectCartItemsCount} from "@/store/model/Cart";
import CartDrawerContainer from "../CartDrawers/CartDrawerContainer/CartDrawerContainer";

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
            <CartDrawerContainer/>
        </Drawer>
      }
    </div>
  );
};

export default CartButton;