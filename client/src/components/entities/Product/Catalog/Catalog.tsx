import React from 'react';
import styles from './ProductCatalog.module.scss'
import {ProductCard} from "@/components/entities/Product";
import Link from "next/link";

const Catalog = () => {
  return (
    <div className={styles.ProductContainer_container}>
      <div className={styles.ProductContainer_products}>
        {Array.from(Array(8).keys()).map((_, i) =>
          <Link
            href={`/products/${i + 1}`}
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
          </Link>
        )}
      </div>
    </div>
  );
};

export default Catalog;