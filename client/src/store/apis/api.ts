import axios from "axios";
import Cookies from "js-cookie";
import {AuthResponse} from "@/store/model/User";

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5116/api/';

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
  console.log("52")
  if (error.response.status === 401 && error.config && !error.config.isRetry) {
    console.log("53")
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
      console.log(error);
    }
  }
})

export default api;