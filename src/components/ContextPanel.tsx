import { useCallback, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import Notifications from "@/components/notification/Notifications";
import TaskForm from "@/components/task/TaskForm";
import TaskView from "@/components/task/TaskView";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/modules/tasks";
import { useGlobalStore } from "@/stores/global.store";

const ContextPanel = () => {
  const isBelowXl = useMediaQuery({ maxWidth: 1279 });
  const { contextType, isContextPanelOpen, closeContextPanel } = useGlobalStore();
  const { setSelectedTask } = useTaskStore();

  const panelContent = useMemo(() => {
    switch (contextType) {
      case "TASK_DETAILS":
        return {
          title: "Task Details",
          content: <TaskView />,
        };
      case "TASK_CREATE":
        return {
          title: "Create Task",
          content: <TaskForm mode={"create"} />,
        };
      case "TASK_UPDATE":
        return {
          title: "Update Task",
          content: <TaskForm mode={"update"} />,
        };
      case "NOTIFICATIONS":
        return {
          title: "Notifications",
          content: <Notifications />,
        };
      default:
        return null;
    }
  }, [contextType]);

  const handleClose = useCallback(() => {
    closeContextPanel();
    setSelectedTask(null);
  }, [closeContextPanel, setSelectedTask]);

  if (!(isContextPanelOpen && panelContent)) return null;

  const { title, content } = panelContent;

  return (
    <>
      {isBelowXl ? (
        <Sheet open={isContextPanelOpen} onOpenChange={handleClose}>
          <SheetContent className="[&>button]:hidden p-0 overflow-hidden max-md:min-w-full">
            <div className="flex h-full overflow-hidden flex-col border bg-background w-full xl:w-[500px]">
              <div className="flex items-center justify-between bg-background min-h-16 px-6 border-b">
                <h6 className="text-xl font-semibold">{title}</h6>
                <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                  ✕
                </button>
              </div>
              <div className="w-full h-full overflow-y-auto p-3">{content}</div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={cn(
            "absolute left-full top-0 md:top-2 bottom-0 md:bottom-2 transition-transform duration-300 ease-in-out z-40",
            isContextPanelOpen ? "-translate-x-full md:-translate-x-[calc(100%+0.5rem)]" : "translate-x-0"
          )}
        >
          <div className="flex h-full shadow-inner_soft overflow-hidden rounded-xl flex-col border bg-card w-full md:w-[400px]">
            <div className="flex items-center justify-between bg-background px-6">
              <h6 className="text-xl font-semibold py-4">{title}</h6>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>
            <div className="w-full h-full overflow-y-auto p-3">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default ContextPanel;
