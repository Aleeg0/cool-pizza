import React, {FC, useEffect} from 'react';
import styles from './styles.module.scss'
import {UiButton} from "@/components/ui";
import {LeftArrowIcon} from "@/components/icons";
import {useAppSelector} from "@/store/lib/hooks";
import {selectCart, useCartActions} from "@/store/model/Cart";
import {CURRENCY, mapToCartItemProps} from "../../lib";
import CartItemsList from "@/components/features/Cart/CartItemList/CartItemsList";

interface Props {
  itemsCount: number
}

const CartDrawer: FC<Props> = ({itemsCount}) => {
  const { totalAmount, goodsCartLines, pizzaCartLines } = useAppSelector(selectCart);
  const { updatePizzaQuantity, updateGoodsQuantity, updateTotalAmount } = useCartActions();

  const goodsCartItems = mapToCartItemProps(goodsCartLines, updateGoodsQuantity);
  const pizzaCartItems = mapToCartItemProps(pizzaCartLines, updatePizzaQuantity);

  useEffect(() => {
    updateTotalAmount();
  }, [goodsCartLines, pizzaCartItems, updateTotalAmount]);

  return (
    <div className={styles.content}>
      <div className={styles.cartDetails}>
        <div className={styles.cartDetails_header}>
          <h3>В корзине <b>{itemsCount}</b> товар</h3>
        </div>
        <div className={styles.cartDetails_cartItems}>
          <CartItemsList cartItems={goodsCartItems}/>
          <CartItemsList cartItems={pizzaCartItems}/>
        </div>
      </div>
      <div className={styles.orderDetails}>
        <div className={styles.orderDetails_priceInfo}>
          <span className={styles.orderDetails_priceInfo__name}>Итого: </span>
          <span className={styles.orderDetails_priceInfo__splitter}/>
          <span className={styles.orderDetails_priceInfo__price}>
            {`${totalAmount} ${CURRENCY}`}
          </span>
        </div>
        <div className={styles.orderDetails_orderButton}>
          <UiButton
            size="l"
            caption="Оформить заказ"
            iconPosition="right"
            icon={<LeftArrowIcon/>}
            isFullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;