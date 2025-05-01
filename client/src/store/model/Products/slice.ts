import {ProductsState} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortByValues} from "@/store/consts/SortByValues";
import {Filters, LoadingStatus} from "@/store/types/shared";
import {fetchProductsGrouped} from "@/store/model/Products/thunk";
import {Product, ProductTypes} from "@/store/types/Product";

const items: Product[] = [
  {
    id: "1",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImg: "/images/test.avif",
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
    baseImg: "/images/testProduct.avif",
    type: ProductTypes.goods,
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
    baseImg: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "1",
    variations: []
  },
  {
    id: "4",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImg: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "1",
    variations: []
  },
  {
    id: "5",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImg: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "2",
    variations: []
  },
  {
    id: "6",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImg: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "2",
    variations: []
  },
  {
    id: "7",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImg: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "3",
    variations: []
  },
  {
    id: "8",
    name: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    minPrice: 25.99,
    baseImg: "/images/test.avif",
    type: ProductTypes.pizza,
    categoryId: "2",
    variations: []
  },
];

const initSortBy = SortByValues.NEWEST;

const initFilters: Filters = {
  priceRange: {},
  ingredientsIds: []
};

const initialState: ProductsState = {
  data: [],
  filters: initFilters,
  sortBy: initSortBy,
  status: LoadingStatus.IDLE,
  error: undefined,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsGrouped.pending, (state) => {
        if (state.status === LoadingStatus.IDLE) {
          state.status = LoadingStatus.PENDING;
        }
      })
      .addCase(fetchProductsGrouped.fulfilled, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.SUCCEEDED;
          state.data = action.payload;
        }
      })
      .addCase(fetchProductsGrouped.rejected, (state, action) => {
        if (state.status === LoadingStatus.PENDING) {
          state.status = LoadingStatus.FAILED;
          state.error = action.error.message;
        }
      });
  }
});

export const {
  setFilters,
  setSortBy
} = productsSlice.actions;

export default productsSlice.reducer;