import { api } from "@/api/axios";
import type { GetProfilePayload, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, User } from "./auth.types";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("auth/login", payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const { data } = await api.post<RegisterResponse>("auth/register", payload);
    return data;
  },

  me: async (): Promise<{ user: User }> => {
    const { data } = await api.get<GetProfilePayload>("/auth/me");
    return { user: data.profile };
  },

  logout: async () => {
    await api.post("/auth/logout");
  },
};
