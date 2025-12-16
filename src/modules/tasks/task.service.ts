import { api } from '@/api/axios.ts';
import type {
  CreateTaskPayload,
  CreateTaskResponse,
  GetAllTasksResponse,
  Task,
  UpdateTaskPayload,
} from '@/modules/tasks/task.types.ts';

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await api.get<GetAllTasksResponse>(`/tasks`);
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
