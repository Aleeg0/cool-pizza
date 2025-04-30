import React, {FC} from 'react';
import styles from './styles.module.scss';

interface Props {
  name: string;
  imgUrl: string;
  price: number;
  currency: string;
}

const Card: FC<Props> = ({
  name,
  imgUrl,
  price,
  currency,
}) => {
  return (
    <button className={styles.root}>
      <span className={styles.imageCover}>
        <div className={styles.imageCover_background}/>
        <img
          className={styles.imageCover_image}
          src={imgUrl}
          alt={name}
        />
      </span>
      <span className={styles.name}>
        {name}
      </span>
      <span className={styles.price}>
        {`${price} ${currency}`}
      </span>
    </button>
  );
};

export default Card;