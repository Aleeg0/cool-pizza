import axios from "axios";

export const errorHandler = (error: Error) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error || 'Ошибка сервера';
    return Promise.reject(new Error(message));
  }
  return Promise.reject(error);
}