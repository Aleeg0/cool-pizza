import React from 'react';
import styles from './Header.module.scss';
import {HeaderTitle, Input} from "@/components/ui";

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

          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;