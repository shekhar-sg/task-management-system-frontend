import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '@/api/socket.ts';
import { authService } from '@/modules/auth/auth.service.ts';
import { useAuthStore } from '@/modules/auth/auth.store.ts';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
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

export const useAuthInit = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.me();
        setUser(data.user);
        connectSocket();
      } catch (error) {
        console.error('Auth check failed:', error);
        clearUser();
        disconnectSocket();
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [clearUser, setAuthLoading, setUser]);
};
