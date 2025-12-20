import { connectSocket, disconnectSocket } from "@/api/socket";
import { authService } from "@/modules/auth/auth.service";
import { useAuthStore } from "@/modules/auth/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["currentUser"], data);
      connectSocket();
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["currentUser"], data);
      connectSocket();
    },
  });
};

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearUser();
      disconnectSocket();
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryFn: authService.me,
    queryKey: ["currentUser"],
  });
};

export const useAuthInit = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

  const { data, isLoading, error } = useCurrentUser();
  setAuthLoading(isLoading);
  if (data) {
    setUser(data.user);
    connectSocket();
  }
  if (error) {
    console.error("Auth check failed:", error);
    clearUser();
    disconnectSocket();
  }
};
