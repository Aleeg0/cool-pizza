import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5116/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
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
})

export default api;