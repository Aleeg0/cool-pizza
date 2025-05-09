'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {OrderHeader} from "@/components/layout";
import styles from './styles.module.scss';
import {
  FormOrderPriceBlock,
  FormOrderCartBlock,
  FormOrderPersonalInfoBlock,
  FormOrderExtraInfoBlock
} from "@/components/features/OrderFrom";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {fetchCart, submitOrder, useOrderForm} from "@/store/model/Cart";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {LoadingStatus} from "@/store/types/shared";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {data: {totalAmount, goodsCartLines, pizzaCartLines}, status} = useAppSelector((state) => state.cart);
  const {formData: orderForm, errors, setFieldValue, validateForm} = useOrderForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const displayCartItems = useMemo(() => [
    ...goodsCartLines,
    ...pizzaCartLines
  ], [goodsCartLines, pizzaCartLines]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (status === LoadingStatus.SUCCEEDED && !isSubmitted && displayCartItems.length === 0) {
      router.push('/');
      toast("Добавьте сперва, что-нибудь в корзину!", {icon: "⚠️",});
    }
  }, [displayCartItems, isSubmitted, router]);

  const onOrderClick = async () => {
    const isValid = validateForm();

    if (isValid) {
      try{
        setIsSubmitted(true);
        await dispatch(submitOrder(orderForm)).unwrap();
        router.push("/");
        toast.success("Заказ оформлен!");
      }
      catch {
        toast.error("Упс... что-то пошло не так :(");
      }
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
                    firstName={orderForm.firstName}
                    lastName={orderForm.lastName}
                    email={orderForm.email}
                    phone={orderForm.phone}
                    errors={errors}
                    onSetField={setFieldValue}
                  />
                </div>
                <div className={styles.orderContent_leftPart__block}>
                  <FormOrderExtraInfoBlock
                    address={orderForm.address}
                    comment={orderForm.comment}
                    error={errors.address}
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