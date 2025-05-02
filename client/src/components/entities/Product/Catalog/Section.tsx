import React, {FC} from 'react';
import styles from './ProductCatalog.module.scss'
import {ProductCard} from "@/components/entities/Product";
import Link from "next/link";
import {Category} from "@/store/types/Category";
import {Product} from "@/store/types/Product";

interface Props {
  category: Category;
  products: Product[];
}

const Section: FC<Props> = ({category, products}) => {
  return (
    <div
      id={category.name}
      className={styles.ProductContainer_container}
    >
      <div className={styles.ProductContainer_title}>
        <h2>{category.value}</h2>
      </div>
      <div className={styles.ProductContainer_products}>
        {products.map((product, i) =>
          <Link
            href={`/products/${product.id}`}
            className={styles.ProductContainer_product}
            key={product.id}
            scroll={false}
          >
            <ProductCard
              imageUrl={product.baseImg}
              title={product.name}
              description={product.description}
              price={product.basePrice}
              currency="руб."
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Section;