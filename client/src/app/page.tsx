import {Header} from "@/components/layout";
import {Categories, Sorter, Filtration} from "@/components/features";
import {ProductCatalog} from "@/components/entities/Product";
import styles from './Home.module.scss'

export default function HomePage() {
  return (
    <div className={styles.HomePage_root}>
      <Header/>
      <main className={styles.HomePage_container}>
        <div className={styles.HomePage_contentWrapper}>
          <div className={styles.HomePage_title}>
            <h1>Все пиццы</h1>
          </div>
          <div className={styles.HomePage_categoriesSort}>
            <Categories/>
            <Sorter/>
          </div>
          <div className={styles.HomePage_content}>
            <div className={styles.HomePage_filtration}>
              <Filtration/>
            </div>
            <main className={styles.HomePage_productCatalog}>
              <ProductCatalog/>
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
