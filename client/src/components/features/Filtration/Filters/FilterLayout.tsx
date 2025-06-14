import React, {FC, ReactNode} from 'react';
import styles from "../Filtration.module.scss";

interface Props {
  title: string;
  children: ReactNode;
}

const FilterLayout: FC<Props> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.FilterLayout_container}>
      <div className={styles.FilterLayout_title}>
        <h5>{title}</h5>
      </div>
      <div className={styles.FilterLayout_content}>
        {children}
      </div>
    </div>
  );
};

export default FilterLayout;