import {create} from "zustand";
import type {Task, TaskFilter} from "@/modules/tasks/task.types";

type TaskState = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  filters: TaskFilter | undefined;
  setFilters: (filters: TaskFilter | undefined) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  selectedTask: null,
  filters: {
    view: "ALL",
  },
  setSelectedTask: (task: Task | null) => set({ selectedTask: task }),
  setFilters: (filters: TaskFilter | undefined) => set({ filters }),
}));
