import React, {FC} from 'react';
import styles from './ProductCatalog.module.scss'
import {ProductCard} from "@/components/entities/Product";
import Link from "next/link";
import {Category} from "@/store/types/category";
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
            href={`/products/${i + 1}`}
            className={styles.ProductContainer_product}
            key={product.id}
          >
            <ProductCard
              imageUrl={product.baseImgUrl}
              title={product.name}
              description={product.description}
              price={product.minPrice}
              currency="₽"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Section;