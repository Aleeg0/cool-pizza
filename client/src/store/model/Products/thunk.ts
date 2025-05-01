import {createAsyncThunk} from "@reduxjs/toolkit";
import productsApi from "@/store/apis/ProductsApi";
import {GroupedProduct} from "@/store/types/Product";
import {Filters} from "@/store/types/shared";


export const fetchProductsGrouped = createAsyncThunk<
  GroupedProduct[],
  void,
  {
    state: { products: { filters: Filters, sortBy: string } }
  }
>(
  "/products/fetchProductsGrouped",
  async (_, {getState }) => {
    const {filters, sortBy} = getState().products;

    try {
      const response = await productsApi.getGroupedProducts(filters, sortBy);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
);