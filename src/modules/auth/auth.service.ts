import { api } from "@/api/axios.ts";
import type { LoginPayload, LoginResponse, User } from "./auth.types.ts";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("auth/login", payload);
    return data;
  },

  me: async (): Promise<{ user: User }> => {
    const { data } = await api.get<{ user: User }>("/auth/me");
    return data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },
};
