import React, {FC} from 'react';
import styles from './styles.module.scss';
import {cn} from "@/utils";

interface Props extends Omit<React.HTMLProps<HTMLButtonElement>, 'onClick'> {
  name: string;
  imgUrl: string;
  price: number;
  currency: string;
  onClick: () => void
}

const Card: FC<Props> = ({
  name,
  imgUrl,
  price,
  currency,
  className,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        styles.root,
        className ? className : ''
      )}
    >
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
        {`${price.toFixed(2)} ${currency}`}
      </span>
    </button>
  );
};

export default Card;