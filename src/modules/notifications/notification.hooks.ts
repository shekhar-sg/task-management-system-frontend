import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/modules/notifications/notification.service";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"];

export const useGetAllNotifications = () => {
  return useQuery({
    queryFn: notificationService.getAllNotifications,
    queryKey: NOTIFICATIONS_QUERY_KEY,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    mutationKey: NOTIFICATIONS_QUERY_KEY,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
};
