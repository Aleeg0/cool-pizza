import {Header} from "@/components/layout";
import {Categories, Sorter, Filtration} from "@/components/features";
import styles from './Home.module.scss'

export default function HomePage() {
  return (
    <div className={styles.HomePage_root}>
      <Header/>
      <div className={styles.HomePage_container}>
        <div className={styles.HomePage_title}>
          <h1>Все пиццы</h1>
        </div>
        <div className={styles.HomePage_categoriesSort}>
          <Categories/>
          <Sorter/>
        </div>
        <main className={styles.HomePage_content}>
          <div className={styles.HomePage_filtration}>
            <Filtration/>
          </div>
          <div className={styles.HomePage_productList}>

          </div>
        </main>
        {/*<div id="meat" style={{height: "400px", background: "orange"}}>

        </div>
        <div id="spicy" style={{height: "400px", background: "green"}}>

        </div>
        <div id="sweet" style={{height: "400px", background: "blue"}}>

        </div>
        <div id="vegetarian" style={{height: "400px", background: "red"}}>

        </div>
        <div id="with_chicken" style={{height: "400px", background: "black"}}>

        </div>*/}
      </div>
    </div>
  );
}
