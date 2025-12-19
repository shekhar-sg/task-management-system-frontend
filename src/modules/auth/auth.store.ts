import {create} from "zustand";
import type {User} from "@/modules/auth/auth.types.ts";

type AuthState = {
  user: User | null;
  userId: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userId: null,
  isAuthenticated: false,
  isAuthLoading: true,
  setUser: (user: User) => set({ user, userId: user.id, isAuthenticated: true, isAuthLoading: false }),
  clearUser: () => set({ user: null, isAuthenticated: false, isAuthLoading: false }),
  setAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),
}));
