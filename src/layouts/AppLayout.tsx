import {useEffect} from "react";
import {useMediaQuery} from "react-responsive";
import NavigationSidebar from "@/components/NavigationSidebar";
import ContextPanel from "@/components/ContextPanel";
import Dashboard from "@/pages/Dashboard";
import TaskForm from "@/components/task/TaskForm";
import {cn} from "@/lib/utils";
import {useTaskStore} from "@/modules/tasks/task.store";
import {useGlobalStore} from "@/stores/global.store";
import TaskView from "@/components/task/TaskView";
import Notifications from "@/components/notification/Notifications";

const AppLayout = () => {
  const { selectedTask } = useTaskStore();
  const { contextType, isContextPanelOpen, closeContextPanel } = useGlobalStore();

  const isBelowMd = useMediaQuery({ maxWidth: 768 });
  const isBelowLg = useMediaQuery({ maxWidth: 1024 });
  useEffect(() => {
    if (isBelowLg) {
      closeContextPanel();
    }
  }, [isBelowLg, closeContextPanel]);

  const panelContent = (() => {
    switch (contextType) {
      case "TASK_DETAILS":
        return selectedTask && <TaskView task={selectedTask} onClose={closeContextPanel} />;
      case "TASK_CREATE":
        return <TaskForm mode={"create"} onSuccess={closeContextPanel} onCancel={closeContextPanel} />;
      case "TASK_UPDATE":
        return (
          selectedTask && (
            <TaskForm mode={"update"} task={selectedTask} onSuccess={closeContextPanel} onCancel={closeContextPanel} />
          )
        );
      case "NOTIFICATIONS":
        return <Notifications />;
      default:
        return null;
    }
  })();

  return (
    <div className={"flex h-svh overflow-hidden gap-2 p-0 md:p-2 relative"}>
      <div
        className={cn(
          "overflow-hidden rounded-xl flex-col border w-full md:w-[400px]",
          isBelowMd && !isContextPanelOpen ? "flex" : !isBelowMd ? "flex" : "hidden"
        )}
      >
        <NavigationSidebar />
      </div>
      {!isBelowMd && (
        <div
          className={cn(
            "flex flex-1 overflow-hidden rounded-xl flex-col shadow-inner border transition-all duration-300 ease-in-out",
            isContextPanelOpen ? "xl:mr-[calc(400px+0.5rem)]" : "xl:mr-0"
          )}
        >
          <Dashboard />
        </div>
      )}
      <ContextPanel>{panelContent}</ContextPanel>
    </div>
  );
};

export default AppLayout;
