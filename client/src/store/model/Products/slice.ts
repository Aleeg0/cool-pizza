import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingStatus} from "@/store/lib/enums";
import {Filters, PriceRange, ProductsState} from "./types";
import {Product, ProductTypes} from "@/store/types/Product";

const items: Product[] = [
  {
    id: "1",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImgUrl: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "1",
    variations: [
      {
        imgUrl: "/images/test.avif",
        dough: "Традиционное",
        size: 25,
        price: 52,
        weight: 25,
        product_id: "1",
        ingredients: [
          {
            id: "1",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
          {
            id: "2",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
          {
            id: "3",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
          {
            id: "4",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
          {
            id: "5",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
          {
            id: "6",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
          {
            id: "7",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
          {
            id: "8",
            name: "Сырный бортик",
            imgUrl: "/images/testIngredient.png",
            price: 152,
          },
        ]
      },
      {
        imgUrl: "/images/testM.avif",
        dough: "Традиционное",
        size: 30,
        price: 52,
        weight: 25,
        product_id: "1",
        ingredients: []
      },
      {
        imgUrl: "/images/testL.avif",
        dough: "Традиционное",
        size: 35,
        price: 52,
        weight: 25,
        product_id: "1",
        ingredients: []
      },
      {
        imgUrl: "/images/testM.avif",
        dough: "Тонкое",
        size: 30,
        price: 52,
        weight: 25,
        product_id: "1",
        ingredients: []
      },
      {
        imgUrl: "/images/testL.avif",
        dough: "Тонкое",
        size: 35,
        price: 52,
        weight: 25,
        product_id: "1",
        ingredients: []
      },
    ]
  },
  {
    id: "2",
    name: "Молочный коктейль Фисташка",
    description: "Сочетание нежности, сливочной текстуры и тонкого вкуса фисташки",
    minPrice: 25.99,
    baseImgUrl: "/images/testProduct.avif",
    type: ProductTypes.pizza,
    categoryId: "4",
    variations: [
      {
        imgUrl: "1",
        price: 52,
        weight: 320,
        details: "0,3 л",
        product_id: "2"
      }
    ]
  },
  {
    id: "3",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImgUrl: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "1"
  },
  {
    id: "4",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImgUrl: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "1"
  },
  {
    id: "5",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImgUrl: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "2"
  },
  {
    id: "6",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImgUrl: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "2"
  },
  {
    id: "7",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImgUrl: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "3"
  },
  {
    id: "8",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImgUrl: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "2"
  },
];

const initFilters: Filters = {
  priceRange: {},
  ingredients: []
};

const initSortBy = "price";

const initialState: ProductsState = {
  items,
  filters: initFilters,
  sortBy: initSortBy,
  status: LoadingStatus.IDLE,
  error: null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFiltersPrice: (state, action: PayloadAction<PriceRange>) => {
      state.filters.priceRange = action.payload;
      console.log(action.payload, state.filters.priceRange);
    },
    setFilterIngredients: (state, action: PayloadAction<string[]>) => {
      state.filters.ingredients = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initFilters;
    },
  }
});

export const {
  setFiltersPrice,
  setFilterIngredients,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;