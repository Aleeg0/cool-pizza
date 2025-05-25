import React, {FC} from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string;
  children: React.ReactNode;
}

const BlockContainer: FC<Props> = ({title, children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_title}>
          <h2>{title}</h2>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default BlockContainer;