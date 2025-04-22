import React from 'react';
import styles from './Header.module.scss';
import {HeaderTitle, Input} from "@/components/ui";
import UiButton from "@/components/ui/Buttons/UiButton";
import {ProfileIcon} from "@/components/icons";

const Header = () => {
  return (
    <div className={styles.Header_root}>
      <header className={styles.Header_container}>
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
      </header>
    </div>
  );
};

export default Header;