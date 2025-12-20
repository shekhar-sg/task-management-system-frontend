import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { taskService } from "@/modules/tasks/task.service";
import type { TaskFilter, UpdateTaskPayload } from "@/modules/tasks/task.types.ts";

export const TASKS_QUERY_KEYS = ["tasks"];

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryFn: () => taskService.getTaskById(id),
    queryKey: [...TASKS_QUERY_KEYS],
  });
};

export const useTasks = (filters?: TaskFilter) => {
  return useQuery({
    queryFn: () => taskService.getAll(filters),
    queryKey: [...TASKS_QUERY_KEYS, ...(filters ? Object.keys(filters) : ["all"])],
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) => taskService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
    },
  });
};

export const useTaskFilters = (): TaskFilter => {
  const [params] = useSearchParams();
  const getValue = (key: string) => {
    return params.get(key) ?? undefined;
  };

  return {
    view: getValue("view"),
    status: getValue("status"),
    priority: getValue("priority"),
    overdue: params.get("overdue") === "true",
    sortByDueDate: params.get("sortByDueDate") as TaskFilter["sortByDueDate"],
  };
};
