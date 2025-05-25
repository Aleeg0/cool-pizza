import React, {FC} from 'react';
import styles from './styles.module.scss'
import {UiButton} from "@/components/ui";
import {PlusIcon} from "@/components/icons";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  currency?: string;
}

const Card: FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  currency,
}) => {
  return (
    <article className={styles.ProductCard_root}>
      <section className={styles.ProductCard_header}>
        <div className={styles.ProductCard_cover}>
          <div className={styles.ProductCard_cover__background}/>
          <img
            className={styles.ProductCard_cover__image}
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
            от <span className={styles.ProductCard_priceValue}>{price.toFixed(2)} {currency}</span>
          </p>
          <div className={styles.ProductCard_button}>
            <UiButton
              type="primaryLight"
              icon={<PlusIcon/>}
              caption="Добавить"
            />
          </div>
        </div>
      </section>
    </article>
  );
};

export default Card;