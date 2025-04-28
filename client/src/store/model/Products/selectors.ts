import {RootState} from "@/store/rootReducer";
import {createSelector} from "reselect";
import {Product} from "@/store/types/Product";


const selectAllProducts = (state: RootState) => state.products.items;
const selectAllCategories = (state: RootState) => state.categories.items;

// Группировка продуктов по categoryId
export const selectGroupedProducts = createSelector(
  [selectAllProducts, selectAllCategories],
  (products, categories) => {
    // Создаём объект, где ключ — category_id, а значение — массив продуктов
    const groupedProducts = products.reduce<Record<string, Product[]>>((acc, product) => {
      const { categoryId } = product;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(product);
      return acc;
    }, {});


    return categories
      .filter((category) => !!groupedProducts[category.id])
      .map((category) => ({
        category: {...category},
        products: groupedProducts[category.id]
      }));
  }
);

export const selectProductById = createSelector(
  [selectAllProducts, (state, id: string) => id],
  (products, id) => products.find((product) => product.id === id)!
);

export const selectFilters = (state: RootState) => state.products.filters;
export const selectSortBy = (state: RootState) => state.products.sortBy;