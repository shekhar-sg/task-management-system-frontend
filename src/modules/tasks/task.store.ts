import {create} from "zustand";
import type {Task} from "@/modules/tasks/task.types";

type TaskState = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  isTaskDetailPanelOpen: boolean;
  setIsTaskDetailPanelOpen: (isOpen: boolean) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  selectedTask: null,
  isTaskDetailPanelOpen: false,
  setSelectedTask: (task: Task | null) => set({ selectedTask: task, isTaskDetailPanelOpen: !!task }),
  setIsTaskDetailPanelOpen: (isOpen: boolean) => set({ isTaskDetailPanelOpen: isOpen }),
}));
