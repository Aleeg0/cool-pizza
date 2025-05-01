import {AxiosInstance} from "axios";
import api from "@/store/apis/api";

class IngredientsApi {
  private _api: AxiosInstance;
  private readonly _baseEndpoint = "ingredients";

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async getIngredients() {
    const response = await this._api.get(`${this._baseEndpoint}`);
    return response;
  }
}

const ingredientsApi = new IngredientsApi(api);
export default ingredientsApi;