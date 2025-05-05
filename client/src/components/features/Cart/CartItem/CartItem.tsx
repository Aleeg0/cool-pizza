import React, {FC} from 'react';
import styles from './styles.module.scss'
import {CrossIcon, MinusIcon, PlusIcon} from "@/components/icons";
import {CartItemProps} from "../types";

const CartItem: FC<CartItemProps> = ({
  id,
  name,
  details,
  addedIngredientsLine,
  imgUrl,
  price,
  quantity,
  currency,
  onUpdateQuantity,
}) => {

  return (
    <div className={styles.container}>
      <button
        onClick={() => onUpdateQuantity(id, 0)}
        className={styles.removeButton}
      >
        <CrossIcon size={16}/>
      </button>
      <article className={styles.content}>
        <section className={styles.imageCover}>
          <img
            className={styles.imageCover_image}
            src={imgUrl}
            alt=""
            loading="lazy"
          />
        </section>
        <section className={styles.rightPart}>
          <div className={styles.productInfo}>
            <div className={styles.productInfo_title}>
              {name}
            </div>
            <div className={styles.productInfo_description}>
              {details}
            </div>
            {addedIngredientsLine && addedIngredientsLine.length > 0 &&
            <div className={styles.productInfo_description}>
              + {addedIngredientsLine}
            </div>
            }
          </div>
          <div className={styles.quantityInfo}>
            <div className={styles.quantityInfo_controllers}>
              <button
                className={styles.quantityInfo_button}
                onClick={() => onUpdateQuantity(id, quantity - 1)}
              >
                <MinusIcon/>
              </button>
              <span className={styles.quantityInfo_quantity}>
                {quantity}
              </span>
              <button
                className={styles.quantityInfo_button}
                onClick={() => onUpdateQuantity(id, quantity + 1)}
              >
                <PlusIcon/>
              </button>
            </div>
            <div className={styles.quantityInfo_price}>
              {`${price} ${currency}`}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default CartItem;