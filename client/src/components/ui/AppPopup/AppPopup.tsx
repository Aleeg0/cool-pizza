import React, {FC, ReactNode} from 'react';
import styles from './AppPopup.module.scss'
import {cn} from "@/utils";

interface PopupProps {
  children: ReactNode;
  isVisible: boolean;
}

export const AppPopup: FC<PopupProps> = ({children, isVisible}) => {
  return (
    <div className={cn(
      styles.AppPopup_root,
      isVisible ? styles.AppPopup_isVisible : ''
    )}>
      <div className={styles.AppPopup_wrapper}>
        <div className={styles.AppPopup_body}>
          {children}
        </div>
      </div>
    </div>
  );
};