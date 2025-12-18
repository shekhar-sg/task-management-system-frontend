import {create} from "zustand";
import type {Task, TaskFilter} from "@/modules/tasks/task.types";

type TaskState = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  isTaskDetailPanelOpen: boolean;
  setIsTaskDetailPanelOpen: (isOpen: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  filters: TaskFilter | undefined;
  setFilters: (filters: TaskFilter | undefined) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  selectedTask: null,
  isTaskDetailPanelOpen: false,
  isEditing: false,
  filters: {
    view: "ALL",
  },
  setSelectedTask: (task: Task | null) => set({ selectedTask: task, isTaskDetailPanelOpen: !!task }),
  setIsTaskDetailPanelOpen: (isOpen: boolean) => set({ isTaskDetailPanelOpen: isOpen }),
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  setFilters: (filters: TaskFilter | undefined) => set({ filters }),
}));
