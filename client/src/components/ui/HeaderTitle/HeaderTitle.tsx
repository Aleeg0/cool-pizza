import React from 'react';
import styles from './HeaderTitle.module.scss'
import {AppIcon} from "@/components/icons";

export const HeaderTitle = () => {
  return (
    <div className={styles.HeaderTitle_content}>
      <div className={styles.HeaderTitle_icon}>
        <AppIcon/>
      </div>
      <div className={styles.HeaderTitle_text}>
        <div className={styles.HeaderTitle_text__title}>
          <h2>Cool Pizza</h2>
        </div>
        <div className={styles.HeaderTitle_text__description}>
          <p>вкуснее уже некуда</p>
        </div>
      </div>
    </div>
  );
};