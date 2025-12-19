import {api} from "@/api/axios";
import type {
  CreateTaskPayload,
  CreateTaskResponse,
  GetAllTasksResponse, GetTaskResponse,
  Task,
  TaskFilter,
  UpdateTaskPayload,
} from "@/modules/tasks/task.types.ts";

export const taskService = {
  getTaskById: async (id: string): Promise<{task: Task }> => {
    const { data } = await api.get<GetTaskResponse>(`/tasks/${id}`);
    return data;
  },

  getAll: async (filters?: TaskFilter): Promise<Task[]> => {
    const { data } = await api.get<GetAllTasksResponse>(`/tasks`, {
      params: filters,
    });
    return data.tasks;
  },

  create: async (payload: CreateTaskPayload): Promise<Task> => {
    const { data } = await api.post<CreateTaskResponse>(`/tasks`, payload);
    return data.task;
  },

  update: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const { data } = await api.patch<CreateTaskResponse>(`/tasks/${id}`, payload);
    return data.task;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
