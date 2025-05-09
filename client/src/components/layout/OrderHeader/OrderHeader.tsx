import React from 'react';
import styles from './styles.module.scss';
import {HeaderTitle} from "@/components/ui";

const OrderHeader = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftPart}>
            <HeaderTitle/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrderHeader;