import React, {FC} from 'react';
import styles from './styles.module.scss'

interface Props {
  name: string;
  details : string;
  addedIngredientsLine?: string;
  imgUrl : string;
  price : number;
  quantity : number;
  currency : string;
}

const Card: FC<Props> = ({
  name,
  details,
  addedIngredientsLine,
  imgUrl,
  price,
  quantity,
  currency,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.productInfo}>
          <div className={styles.productInfo_imageCover}>
            <img
              className={styles.productInfo_imageCover__image}
              src={imgUrl}
              alt=""
              loading="lazy"
            />
          </div>
          <div className={styles.productInfo_description}>
            <div className={styles.productInfo_description__title}>
              {name}
            </div>
            <div className={styles.productInfo_description__details}>
              {details}
            </div>
            {addedIngredientsLine &&
              <div className={styles.productInfo_description__details}>
                + {addedIngredientsLine}
              </div>
            }
          </div>
        </div>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfo_price}>
            {`${price} ${currency}`}
          </div>
          <div className={styles.orderInfo_quantity}>
            {`${quantity} шт.`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;