import {LogOut} from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DaTaTable from "@/components/dashboard/DaTaTable";
import {ThemeToggle} from "@/components/ThemeToggle";
import {columns} from "@/components/task/columns";
import {Button} from "@/components/ui/button";
import {ButtonGroupSeparator} from "@/components/ui/button-group";
import {useLogout} from "@/modules/auth";
import {useTasks} from "@/modules/tasks";
import {useTaskStore} from "@/modules/tasks/task.store";
import ToggleNotification from "@/components/notification/ToggleNotification";

const Dashboard = () => {
  const logout = useLogout();
  const filters = useTaskStore((state) => state.filters);
  const { data } = useTasks(filters);

  return (
    <>
      <div className={"flex items-center bg-background justify-between h-16 px-6"}>
        <h6 className={"text-xl"}>Dashboard</h6>
        <div className={"flex gap-4 items-center"}>
          <ThemeToggle />
          <ButtonGroupSeparator />
          <Button variant={"outline"} onClick={() => logout.mutate()}>
            <LogOut />
          </Button>
          <ToggleNotification />
        </div>
      </div>
      <div className={"flex flex-col justify-between w-full h-full shadow-inner_soft bg-card"}>
        <DashboardStats />
        <DaTaTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
};

export default Dashboard;
