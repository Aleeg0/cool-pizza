import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "@/store/types/Product";
import {UUID} from "@/store/types/shared";
import productsApi from "@/store/apis/ProductsApi";

export const fetchCurrentProduct = createAsyncThunk<
  Product,
  UUID,
  {
    state: { currentProduct: { data?: Product } },
    rejectValue: string,
  }
>(
  "/products/fetchCurrentProduct",
  async (productId, {getState }) => {
    const {data} = getState().currentProduct;

    // was previous request
    if (data && data.id === productId) {
      return data;
    }

    try {
      const response = await productsApi.getProductById(productId);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
);