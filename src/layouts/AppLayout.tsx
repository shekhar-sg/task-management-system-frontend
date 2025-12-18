import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationSidebar from "@/components/NavigationSidebar";
import ContextPanel from "@/components/ContextPanel";
import Dashboard from "@/pages/Dashboard";
import TaskForm from "@/components/task/TaskForm";
import TaskView from "@/components/task/TaskView";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/modules/tasks/task.store";

const AppLayout = () => {
  const { isTaskDetailPanelOpen, setIsTaskDetailPanelOpen, selectedTask, isEditing } = useTaskStore();

  const isBelowMd = useMediaQuery({ maxWidth: 768 });
  const isBelowLg = useMediaQuery({ maxWidth: 1024 });
  useEffect(() => {
    if (isBelowLg) {
      setIsTaskDetailPanelOpen(false);
    }
  }, [isBelowLg, setIsTaskDetailPanelOpen]);

  const content =
    selectedTask && !isEditing ? (
      <TaskView
        task={selectedTask}
        onClose={() => {
          setIsTaskDetailPanelOpen(false);
        }}
      />
    ) : selectedTask && isEditing ? (
      <TaskForm
        mode="update"
        task={selectedTask}
        onSuccess={() => {
          setIsTaskDetailPanelOpen(false);
        }}
        onCancel={() => {
          setIsTaskDetailPanelOpen(false);
        }}
      />
    ) : (
      <TaskForm
        mode="create"
        onSuccess={() => {
          setIsTaskDetailPanelOpen(false);
        }}
        onCancel={() => {
          setIsTaskDetailPanelOpen(false);
        }}
      />
    );

  return (
    <div className={"flex h-svh overflow-hidden gap-2 p-0 md:p-2 relative"}>
      <div
        className={cn(
          "overflow-hidden rounded-xl flex-col border w-full md:w-[400px]",
          isBelowMd && !isTaskDetailPanelOpen ? "flex" : !isBelowMd ? "flex" : "hidden"
        )}
      >
        <NavigationSidebar />
      </div>
      {!isBelowMd && (
        <div
          className={cn(
            "flex flex-1 overflow-hidden rounded-xl flex-col shadow-inner border transition-all duration-300 ease-in-out",
            isTaskDetailPanelOpen ? "xl:mr-[calc(400px+0.5rem)]" : "xl:mr-0"
          )}
        >
          <Dashboard />
        </div>
      )}
      <ContextPanel>{content}</ContextPanel>
    </div>
  );
};

export default AppLayout;
