import { taskService } from "@/modules/tasks/task.service";
import type { TaskFilter, UpdateTaskPayload } from "@/modules/tasks/task.types.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const TASKS_QUERY_KEYS = ["tasks"];

export const useGetTaskById = (id?: string) => {
  return useQuery({
    queryFn: () => taskService.getTaskById(id),
    queryKey: [id],
    enabled: !!id,
  });
};

export const useTasks = (filters?: TaskFilter) => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryFn: () => taskService.getAll(filters),
    queryKey: [...TASKS_QUERY_KEYS, ...(filters ? Object.entries(filters) : ["all"])],
  });
  if (result.data) {
    result.data.forEach((task) => {
      queryClient.setQueryData([task.id], { task });
    });
  }

  return result;
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
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
      queryClient.invalidateQueries({ queryKey: [variables.id] });
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
