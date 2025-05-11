import api, {BASE_URL} from "@/store/apis/api";
import axios, {AxiosInstance} from "axios";
import {AuthResponse, LoginRequest, RegisterRequest} from "@/store/model/User";

class AuthApi {
  private _api: AxiosInstance;
  private readonly _baseEndpoint = "auth";

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await this._api.post(
      `${this._baseEndpoint}/register`,
      request
    );
    return response.data;
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await this._api.post(
      `${this._baseEndpoint}/login`,
      request
    );

    return response.data;
  }

  async logout(): Promise<void> {
    const response = await this._api.post(
      `${this._baseEndpoint}/logout`
    );

    return response.data;
  }

  async refresh(): Promise<AuthResponse> {
    const response = await axios.post(
      `${BASE_URL}${this._baseEndpoint}/refresh`, {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
}

const authApi = new AuthApi(api);
export default authApi;