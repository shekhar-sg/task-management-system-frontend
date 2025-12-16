import {api} from '@/api/axios.ts';
import type {
  CreateTaskPayload,
  CreateTaskResponse,
  GetAllTasksResponse,
  UpdateTaskPayload,
} from '@/modules/tasks/task.types.ts';

export const taskService = {
  getAll: async (): Promise<GetAllTasksResponse> => {
    const { data } = await api.get<GetAllTasksResponse>(`/tasks`);
    return data;
  },

  create: async (payload: CreateTaskPayload): Promise<CreateTaskResponse> => {
    const { data } = await api.post<CreateTaskResponse>(`/tasks`, payload);
    return data;
  },

  update: async (id: string, payload: UpdateTaskPayload): Promise<CreateTaskResponse> => {
    const { data } = await api.patch<CreateTaskResponse>(`/tasks/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
