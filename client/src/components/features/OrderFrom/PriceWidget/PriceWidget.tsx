import React, {FC, ReactNode} from 'react';
import styles from './styles.module.scss';

interface Props {
  caption: string;
  price: number;
  icon?: ReactNode
}

const PriceWidget: FC<Props> = ({
  caption,
  price,
  icon
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {icon &&
          <div className={styles.icon}>
            {icon}
          </div>
        }
        <div className={styles.description}>
          <span className={styles.caption}>{caption}</span>
          <span className={styles.splitter}/>
          <span className={styles.price}>
            {`${price} руб.`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceWidget;