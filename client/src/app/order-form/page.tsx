import React from 'react';
import {OrderHeader} from "@/components/layout";
import styles from './styles.module.scss';
import {FormOrderPriceBlock, FormOrderCartBlock, FormOrderPersonalInfoBlock} from "@/components/features/OrderFrom";

const Page = () => {
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
                <div className={styles.orderContent_leftPart__orderCart}>
                  <FormOrderCartBlock/>
                </div>
                <FormOrderPersonalInfoBlock/>
              </div>
              <div className={styles.orderContent_rightPart}>
                <FormOrderPriceBlock/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;