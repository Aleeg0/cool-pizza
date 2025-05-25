import {AxiosInstance} from "axios";
import api from "@/store/apis/api";

class AddressesApi {
  private _api: AxiosInstance;
  private readonly _baseEndpoint = "addresses";

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async getAddresses(value: string): Promise<string[]> {
    const response = await this._api.get(
      `${this._baseEndpoint}?searchValue=${value}`
    );
    return response.data.addresses;
  }
}

const addressesApi = new AddressesApi(api);
export default addressesApi;