import { api } from "@/api/axios";
import type { Notification, NotificationsResponse } from "@/modules/notifications/notinication.type";

export const notificationService = {
  getAllNotifications: async (): Promise<Notification[]> => {
    const { data } = await api.get<NotificationsResponse>("/notifications");
    return data.notifications;
  },
  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/notifications/${id}/read`);
  },
};
