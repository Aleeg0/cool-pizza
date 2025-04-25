import React from 'react';
import styles from './ProductCatalog.module.scss'
import {ProductCard} from "@/components/entities";

const ProductCatalog = () => {
  return (
    <div className={styles.ProductContainer_container}>
      <div className={styles.ProductContainer_products}>
        {Array.from(Array(8).keys()).map((_, i) =>
          <div
            className={styles.ProductContainer_product}
            key={i}
          >
            <ProductCard
              imageUrl="/images/test.avif"
              title="Диабло"
              description="Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла"
              price={25.99}
              currency="₽"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;