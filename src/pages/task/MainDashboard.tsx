import {LogOut} from "lucide-react";
import {useEffect} from "react";
import {useMediaQuery} from "react-responsive";
import {ThemeToggle} from "@/components/ThemeToggle";
import {Button} from "@/components/ui/button";
import {ButtonGroupSeparator} from "@/components/ui/button-group";
import {cn} from "@/lib/utils";
import {useLogout} from "@/modules/auth";
import {useTaskStore} from "@/modules/tasks/task.store";
import {columns} from "@/pages/task/columns";
import DaTaTable from "@/pages/task/DaTaTable";
import {tasks} from "@/pages/task/type.constants";

const MainDashboard = () => {
  const logout = useLogout();
  const { isTaskDetailPanelOpen, setIsTaskDetailPanelOpen } = useTaskStore();
  const isBelowLg = useMediaQuery({ maxWidth: 1024 });
  useEffect(() => {
    if (isBelowLg) {
      setIsTaskDetailPanelOpen(false);
    }
  }, [isBelowLg, setIsTaskDetailPanelOpen]);

  return (
    <div
      className={cn(
        "flex flex-1 overflow-hidden rounded-xl flex-col shadow-inner border transition-all duration-300 ease-in-out",
        isTaskDetailPanelOpen ? "xl:mr-[calc(400px+0.5rem)]" : "xl:mr-0"
      )}
    >
      <div className={"flex items-center bg-background justify-between h-16 px-6"}>
        <h6 className={"text-xl"}>Dashboard</h6>
        <div className={"flex gap-4 items-center"}>
          <ThemeToggle />
          <ButtonGroupSeparator />
          <Button variant={"outline"} onClick={() => logout.mutate()}>
            <LogOut />
          </Button>
        </div>
      </div>
      <div className={"flex flex-col justify-between w-full h-full shadow-inner_soft bg-card"}>
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="h-44 bg-info rounded-xl"></div>
          <div className="h-44 bg-info rounded-xl"></div>
          <div className="h-44 bg-info rounded-xl"></div>
        </div>
        <DaTaTable columns={columns} data={tasks} />
      </div>
    </div>
  );
};

export default MainDashboard;
