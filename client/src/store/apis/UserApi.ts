import {AxiosInstance} from "axios";
import api from "@/store/apis/api";
import {User} from "@/store/model/User";

export class UserApi {
  private _api: AxiosInstance;
  private readonly _baseEndpoint = "user";

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async getUser() : Promise<User> {
    const response = await this._api.get(`${this._baseEndpoint}`);
    return response.data;
  }

  async updateUser(
    phone?: string,
    firstName?: string,
    lastName?: string
  ) : Promise<User> {
    const response = await this._api.put(`${this._baseEndpoint}`, {
      phone: phone,
      firstName: firstName,
      lastName: lastName,
    });
    return response.data;
  }
}

const authApi = new UserApi(api);
export default authApi;