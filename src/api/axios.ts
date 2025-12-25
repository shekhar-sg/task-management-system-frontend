import axios, {type AxiosError, type AxiosInstance} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

type ApiErrorResponse = {
    message?: string;
};

export const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 50 seconds
});

export const getApiBaseUrl = (): string => API_BASE_URL;

export const setupAuthInterceptor = (onUnauthorized: () => void): void => {
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      if (error.response?.status === 401) {
        onUnauthorized();
      }
      const message = error.response?.data?.message || error.message;
      return Promise.reject(new Error(message));
    }
  );
};
