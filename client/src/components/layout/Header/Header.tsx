'use client';

import React, {Suspense} from 'react';
import styles from './Header.module.scss';
import {HeaderTitle} from "@/components/ui";
import {useScrollTrigger} from "@/hooks";
import {cn} from "@/utils";
import {AuthButton} from "@/components/features/Auth";
import {Categories, Sorter} from "@/components/features";
import CartButton from "@/components/features/Cart/CartButton/CartButton";

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
            <div className={styles.Header_leftPart__filters}>
              <Categories/>
              <Suspense>
                <Sorter/>
              </Suspense>
            </div>
          </div>
          <div className={styles.Header_rightPart}>
            <AuthButton/>
            <CartButton/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;