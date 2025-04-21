import React from 'react';
import styles from './Header.module.scss';
import {HeaderTitle} from "../../ui";

const Header = () => {
  return (
    <div className={styles.Header_root}>
      <header className={styles.Header_container}>
        <div className={styles.Header_content}>
          <div className={styles.Header_leftPart}>
            <HeaderTitle/>
          </div>
          <div className={styles.Header_Searcher}>

          </div>
          <div className={styles.Header_rightPart}>

          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;