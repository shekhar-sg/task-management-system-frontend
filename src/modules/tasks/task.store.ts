import type { Task, TaskFilter } from "@/modules/tasks/task.types";
import { create } from "zustand";

type TaskState = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  filters: TaskFilter | undefined;
  setFilters: (filters: TaskFilter | undefined) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  selectedTask: null,
  selectedTaskId: null,
  filters: undefined,
  setSelectedTask: (task: Task | null) => set({ selectedTask: task, selectedTaskId: task?.id }),
  setFilters: (filters: TaskFilter | undefined) => set({ filters }),
  setSelectedTaskId: (id: string | null) => set({ selectedTaskId: id }),
}));
