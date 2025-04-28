'use client';

import {Header} from "@/components/layout";
import {Categories, Sorter, Filtration} from "@/components/features";
import {ProductSection} from "@/components/entities/Product";
import styles from './Home.module.scss'
import {useAppSelector} from "@/store/lib/hooks";
import {selectGroupedProducts} from "@/store/model/Products";

export default function HomePage() {
  const groupedProducts = useAppSelector(selectGroupedProducts);
  const existCategories = groupedProducts.length > 0
    ? groupedProducts.map((group) => group.category)
    : [];

  return (
    <div className={styles.HomePage_root}>
      <Header/>
      <main className={styles.HomePage_container}>
        <div className={styles.HomePage_contentWrapper}>
          <div className={styles.HomePage_title}>
            <h1>Все пиццы</h1>
          </div>
          <div className={styles.HomePage_categoriesSort}>
            <Categories
              categoriesData={existCategories}
            />
            <Sorter/>
          </div>
          <div className={styles.HomePage_content}>
            <div className={styles.HomePage_filtration}>
              <Filtration/>
            </div>
            <main className={styles.HomePage_productCatalog}>
              {groupedProducts.map((groupedProduct ) =>
                <ProductSection
                  key={groupedProduct.category.id}
                  {...groupedProduct}
                />
              )}
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
