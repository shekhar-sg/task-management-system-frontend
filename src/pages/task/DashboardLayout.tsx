import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/modules/tasks/task.store";
import MainDashboard from "@/pages/task/MainDashboard";
import TaskDetailsPanel from "@/pages/task/TaskDetailsPanel";
import UserInformation from "@/pages/task/UserInformation";

const DashboardLayout = () => {
  const { isTaskDetailPanelOpen, setIsTaskDetailPanelOpen } = useTaskStore();

  const isBelowMd = useMediaQuery({ maxWidth: 768 });
  const isBelowLg = useMediaQuery({ maxWidth: 1024 });
  useEffect(() => {
    if (isBelowLg) {
      setIsTaskDetailPanelOpen(false);
    }
  }, [isBelowLg, setIsTaskDetailPanelOpen]);

  return (
    <div className={"flex h-svh overflow-hidden gap-2 p-0 md:p-2 relative"}>
      <div
        className={cn(
          "overflow-hidden rounded-xl flex-col border w-full md:w-[400px]",
          isBelowMd && !isTaskDetailPanelOpen ? "flex" : !isBelowMd ? "flex" : "hidden"
        )}
      >
        <UserInformation />
      </div>
      {!isBelowMd && <MainDashboard />}
      <TaskDetailsPanel />
    </div>
  );
};

export default DashboardLayout;
