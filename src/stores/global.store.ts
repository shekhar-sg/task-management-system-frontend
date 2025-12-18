import {create} from "zustand";

type ContextPanelType = "TASK_DETAILS" | "TASK_CREATE" | "TASK_UPDATE" | "NOTIFICATIONS" | null;

type GlobalState = {
  isContextPanelOpen: boolean;
  contextType: ContextPanelType;
  openContextPanel: (type: Exclude<ContextPanelType, null>) => void;
  closeContextPanel: () => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  isContextPanelOpen: false,
  contextType: null,
  openContextPanel: (type) =>
    set({
      isContextPanelOpen: true,
      contextType: type,
    }),
  closeContextPanel: () =>
    set({
      isContextPanelOpen: false,
      contextType: null,
    }),
}));
