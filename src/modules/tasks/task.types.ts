import type {User} from "@/modules/auth";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: Priority;
  status: TaskStatus;
  creatorId: string;
  creator: User;
  assignedToId?: string;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  assignedToId?: string;
};

export type UpdateTaskPayload = Partial<{
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  assignedToId: string;
}>;

export type CreateTaskResponse = {
  message: string;
  task: Task;
};

export type GetTaskResponse = {
  message: string;
  task: Task;
};

export type GetAllTasksResponse = {
  message: string;
  tasks: Task[];
};

export type TaskFilter = {
  view?: string;
  status?: string;
  priority?: string;
  sortByDueDate?: "asc" | "desc";
  overdue?: boolean;
};
