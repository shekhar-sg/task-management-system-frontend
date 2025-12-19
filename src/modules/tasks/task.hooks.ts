import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {taskService} from "@/modules/tasks/task.service";
import type {TaskFilter, UpdateTaskPayload} from "@/modules/tasks/task.types.ts";

export const TASKS_QUERY_KEY = ["tasks"];

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryFn: () => taskService.getTaskById(id),
    queryKey: [...TASKS_QUERY_KEY, id],
  });
};

export const useTasks = (filters?: TaskFilter) => {
  return useQuery({
    queryFn: () => taskService.getAll(filters),
    queryKey: [TASKS_QUERY_KEY, filters],
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) => taskService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
};
