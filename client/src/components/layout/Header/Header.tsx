'use client';

import React from 'react';
import styles from './Header.module.scss';
import {HeaderTitle, Input} from "@/components/ui";
import {UiButton} from "@/components/ui";
import {ProfileIcon} from "@/components/icons";
import {useScrollTrigger} from "@/hooks";
import {cn} from "@/utils";

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
            <UiButton
              caption="Профиль"
              icon={<ProfileIcon className="UiKit_icon__transition" />}
              iconSize="m"
              type="secondary"
            />
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