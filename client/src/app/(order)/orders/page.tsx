'use client';

import styles from '../Orders.module.scss';
import {OrderWidget} from "@/components/entities/Order";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {selectOrders} from "@/store/model/Orders/selector";
import {useEffect} from "react";
import {fetchOrders} from "@/store/model/Orders";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  },[dispatch]);


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Мои заказы</h1>
        </div>
        <div className={styles.orders}>
          {data.map((order, i) =>
            <div
              className={styles.order}
              key={order.id}
            >
              <OrderWidget
                index={i + 1}
                {...order}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;