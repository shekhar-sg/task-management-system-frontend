export type NotificationType = "TASK_ASSIGNED" | "TASK_UPDATED" | "TASK_DELETED";
export type Notification = {
  id: string;
  userId: string;
  taskId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type NotificationsResponse = {
  message: string;
  notifications: Notification[];
};
