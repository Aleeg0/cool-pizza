import axios from "axios";
import Cookies from "js-cookie";
import {AuthResponse} from "@/store/model/User";
import {errorHandler} from "@/store/lib/errorHandler";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5080/api/';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;

  if (config.url?.includes('cart')) { // Проверяем URL
    const token = Cookies.get('X-Cart-Token');
    if (token) {
      config.headers['X-Cart-Token'] = token;
    }
  }
  return config;
});

api.interceptors.response.use((response) => {
  if (response.config.url?.includes('cart')) {
    const newToken = response.headers['x-cart-token'];
    if (newToken) {
      Cookies.set('X-Cart-Token', newToken, {
        expires: 3,
        path: '/',
        sameSite: 'strict'
      });
    }
  }
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config.isRetry) {
    originalRequest.isRetry = true;
    try {
      const response = await axios.post<AuthResponse>(
        `${BASE_URL}auth/refresh`, {},
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.accessToken);
      return api.request(originalRequest);
    }
    catch (error) {
      return errorHandler(error as Error);
    }
  }
  return errorHandler(error);
})

export default api;