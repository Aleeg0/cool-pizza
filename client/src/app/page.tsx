'use client';

import {Header} from "@/components/layout";
import {Categories, Sorter, Filtration} from "@/components/features";
import {ProductSection} from "@/components/entities/Product";
import styles from './Home.module.scss'
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {useEffect} from "react";
import {fetchProductsGrouped} from "@/store/model/Products/thunk";
import {fetchIngredients} from "@/store/model/Ingredients/thunk";
import {setSortBy} from "@/store/model/Products";
import {useRouter, useSearchParams} from "next/navigation";
import {SortByValues} from "@/store/consts/SortByValues";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {data: groupedProducts, sortBy, filters} = useAppSelector(state => state.products);
  const existCategories = groupedProducts.length > 0
    ? groupedProducts.map((group) => group.category)
    : [];

  useEffect(() => {
    const urlSortBy = searchParams.get('sortBy');
    if (urlSortBy) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('sortBy');
      router.push(`?${newParams.toString()}`);
    }
  }, []);

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === SortByValues.NEWEST) {
      newParams.delete('sortBy');
    } else {
      newParams.set('sortBy', value);
    }
    router.push(`?${newParams.toString()}`);
    dispatch(setSortBy(value));
  };

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
          <div className={styles.HomePage_title}>
            <h1>Все пиццы</h1>
          </div>
          <div className={styles.HomePage_categoriesSort}>
            <Categories
              categoriesData={existCategories}
            />
            <Sorter
              onSortChange={handleSortChange}
              sortBy={sortBy}
            />
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
