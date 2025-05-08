'use client';

import React, {useEffect} from 'react';
import {OrderHeader} from "@/components/layout";
import styles from './styles.module.scss';
import {FormOrderPriceBlock, FormOrderCartBlock, FormOrderPersonalInfoBlock} from "@/components/features/OrderFrom";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {fetchCart, selectCart, submitOrder, useOrderForm} from "@/store/model/Cart";
import {useRouter} from "next/navigation";

const Page = () => {
  const dispatch = useAppDispatch();
  const {totalAmount, goodsCartLines, pizzaCartLines} = useAppSelector(selectCart);
  const {formData: orderForm, errors, setFieldValue, validateForm} = useOrderForm();
  const router = useRouter();

  const displayCartItems = [
    ...goodsCartLines,
    ...pizzaCartLines
  ];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const onOrderClick = () => {
    const isValid = validateForm();

    if (isValid) {
      dispatch(submitOrder(orderForm));
      router.push("/");
    }
  }

  return (
    <div className={styles.root}>
      <OrderHeader/>
      <main id="main">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h1>Оформление заказа</h1>
            </div>
            <div className={styles.orderContent}>
              <div className={styles.orderContent_leftPart}>
                <div className={styles.orderContent_leftPart__block}>
                  <FormOrderCartBlock
                    cartItems={displayCartItems}
                  />
                </div>
                <div className={styles.orderContent_leftPart__block}>
                  <FormOrderPersonalInfoBlock
                    {...orderForm}
                    errors={errors}
                    onSetField={setFieldValue}
                  />
                </div>
              </div>
              <div className={styles.orderContent_rightPart}>
                <FormOrderPriceBlock
                  totalAmount={totalAmount}
                  currency={'руб.'}
                  onOrderClick={onOrderClick}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;