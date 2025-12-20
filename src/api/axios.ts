import axios from "axios";
import { disconnectSocket } from "@/api/socket";
import { useAuthStore } from "@/modules/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Optionally handle unauthorized errors globally
      const { clearUser } = useAuthStore.getState();
      clearUser();
      disconnectSocket();
    }
    return Promise.reject(error);
  }
);
