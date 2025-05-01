import {AxiosInstance, AxiosResponse} from "axios";
import {Filters, UUID} from "@/store/types/shared";
import api from "@/store/apis/api";
import {GroupedProduct, Product} from "@/store/types/Product";

class ProductsApi {
  private _api: AxiosInstance;
  private readonly _baseEndpoint = "products";

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async getGroupedProducts(filters: Filters, sortBy?: string): Promise<AxiosResponse<GroupedProduct[]>> {
    const response = await this._api.post(
      `${this._baseEndpoint}/menu/filtered?sortBy=${sortBy}`,
      {
        priceMin: filters.priceRange.min,
        priceMax: filters.priceRange.max,
        ingredientsIds: filters.ingredientsIds
      });
    return response;
  }

  async getProductById(id: UUID): Promise<AxiosResponse<Product>> {
    const response = await this._api.post(`${this._baseEndpoint}/${id}`);
    return response;
  }

  async getSearchedProducts(searchValue: string) {
    const response = await this._api.post(`${this._baseEndpoint}/search?searchValue=${searchValue}`);
    return response;
  }
}

const productsApi = new ProductsApi(api);
export default productsApi;