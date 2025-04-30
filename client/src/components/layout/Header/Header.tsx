'use client';

import React from 'react';
import styles from './Header.module.scss';
import {HeaderTitle, UiButton, Input} from "@/components/ui";
import {useScrollTrigger} from "@/hooks";
import {cn} from "@/utils";
import {AuthButton} from "@/components/features/Auth";

const Header = () => {
  const isScrolled = useScrollTrigger();

  return (
    <header className={styles.Header_root}>
      <div className={cn(
        styles.Header_container,
        isScrolled ? styles.Header_flying : ''
      )}>
        <div className={styles.Header_content}>
          <div className={styles.Header_leftPart}>
            <div className={styles.Header_leftPart__Title}>
              <HeaderTitle/>
            </div>
            <div className={styles.Header_leftPart__Searcher}>
              <Input/>
            </div>
          </div>
          <div className={styles.Header_rightPart}>
            <AuthButton/>
            <UiButton
              caption="Корзина"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;