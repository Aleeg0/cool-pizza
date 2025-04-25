import React, {FC} from 'react';
import styles from './ProductCard.module.scss'
import {UiButton} from "@/components/ui";
import {PlusIcon} from "@/components/icons";

interface PrdocutCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  currency?: string;
}

const ProductCard: FC<PrdocutCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  currency,
}) => {
  return (
    <article className={styles.ProductCard_root}>
      <section className={styles.ProductCard_header}>
        <div className={styles.ProductCard_imageCover}>
          <div className={styles.ProductCard_cover}/>
          <img
            className={styles.ProductCard_image}
            src={imageUrl}
            alt=""
            loading="lazy"
          />
        </div>
      </section>

      <section className={styles.ProductCard_footer}>
        <div className={styles.ProductCard_container}>
          <div className={styles.ProductCard_title}>
            <h3>{title}</h3>
          </div>
          <div className={styles.ProductCard_description}>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.ProductCard_secondaryInfo}>
          <p className={styles.ProductCard_price}>
            от <span className={styles.ProductCard_priceValue}>{price} {currency}</span>
          </p>
          <div className={styles.ProductCard_button}>
            <UiButton
              icon={<PlusIcon/>}
              caption="Добавить"
            />
          </div>
        </div>
      </section>
    </article>
  );
};

export default ProductCard;