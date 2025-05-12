import axios, {AxiosInstance} from "axios";
import api from "@/store/apis/api";
import {UUID} from "@/store/types/shared";
import {
  Cart,
  CartItem,
  UpdateCartItem
} from "@/store/model/Cart/types";
import Cookies from "js-cookie";
import {OrderResponse} from "@/store/model/Orders/types";

class CartApi {
  private _api: AxiosInstance;
  private readonly _baseEndpoint = "cart";

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async getCartByToken(): Promise<Cart|null> {
    const cartToken = Cookies.get("X-Cart-Token");
    if (!cartToken) {
      return null;
    }

    const response = await axios.get(
      `${this._baseEndpoint}/${cartToken}`
    );
    return response.data;
  }

  async getOrders(): Promise<OrderResponse> {
    const response = await this._api.get(
      `${this._baseEndpoint}`
    );

    return response.data;
  }

  async getCartTotalAmount(): Promise<number> {
    const response = await this._api.get(
      `${this._baseEndpoint}/total-amount`
    );

    return response.data.totalAmount;
  }

  async addPizzaToCart(pizzaId: UUID, ingredientsIds: UUID[]): Promise<CartItem> {
    // отправляем запрос на добавление пиццы
    const response = await this._api.post(
      `${this._baseEndpoint}/pizzas`, {
        pizzaId,
        ingredientsIds,
      }
    );

    return response.data;
  }

  async addGoodsToCart(goodsId: UUID): Promise<CartItem> {
    // отправляем запрос на добавление простого продукта
    const response = await this._api.post(
      `${this._baseEndpoint}/goods`,
      {goodsId}
    );

    return response.data;
  }

  async updateCartItem(id: UUID, quantity: number, endpoint: string): Promise<UpdateCartItem> {
    // запрос на обновление quantity у простого продукта
    const response = await this._api.patch(
      `${this._baseEndpoint}/${endpoint}/${id}`,
      {quantity}
    );

    return response.data;
  }

  async removeCartPizza(id: UUID, endpoint: string): Promise<void> {
    // запрос на удаление пиццы
    const response = await this._api.delete(
      `${this._baseEndpoint}/${endpoint}/${id}`
    );

    return response.data;
  }

  async updatePersonalInfo(
    name: string,
    email: string,
    phone: string,
    address: string,
    comment: string
  ): Promise<Cart> {
    const cartToken = Cookies.get("X-Cart-Token");

    const response = await this._api.put(
      `${this._baseEndpoint}/${cartToken}`,
      {
        name,
        email,
        phone,
        address,
        comment
      }
    );

    if (response.status == 200) {
      Cookies.remove("X-Cart-Token", {
        path: "/"
      });
    }

    return response.data;
  }
}
const cartApi = new CartApi(api);
export default cartApi;