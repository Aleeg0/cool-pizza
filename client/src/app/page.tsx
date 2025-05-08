'use client';

import {Header} from "@/components/layout";
import {Filtration} from "@/components/features";
import {ProductSection} from "@/components/entities/Product";
import styles from './Home.module.scss'
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {useEffect} from "react";
import {fetchProductsGrouped} from "@/store/model/Products/thunk";
import {fetchIngredients} from "@/store/model/Ingredients/thunk";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const {data: groupedProducts, sortBy, filters} = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsGrouped());
  }, [dispatch, sortBy, filters]);

  return (
    <div className={styles.HomePage_root}>
      <Header/>
      <main className={styles.HomePage_container}>
        <div className={styles.HomePage_contentWrapper}>
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
