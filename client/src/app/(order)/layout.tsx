import React from 'react';
import styles from "./Orders.module.scss";
import {OrderHeader} from "@/components/layout";

export default function OrderLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.root}>
      <OrderHeader/>
      <main id={styles.main}>
        {children}
      </main>
    </div>
  );
};