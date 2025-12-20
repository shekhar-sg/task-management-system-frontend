import { LogOut } from "lucide-react";
import { useEffect } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DataTable from "@/components/dashboard/DataTable";
import ToggleNotification from "@/components/notification/ToggleNotification";
import { ThemeToggle } from "@/components/ThemeToggle";
import { columns } from "@/components/task/columns";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { useAuthStore, useLogout } from "@/modules/auth";
import { useTaskFilters, useTasks } from "@/modules/tasks";
import { useTaskStore } from "@/modules/tasks/task.store";

const Dashboard = () => {
  const filters = useTaskFilters();
  const setFilters = useTaskStore((state) => state.setFilters);
  const { data } = useTasks(filters);
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  useEffect(() => {
    setFilters(filters);
  }, [filters, setFilters]);

  return (
    <>
      <div className={"flex items-center bg-background justify-between h-16 px-4"}>
        <h6 className={"text-xl py-4"}>Dashboard</h6>
        <div className={"flex gap-4 items-center"}>
          <ThemeToggle />
          <ToggleNotification />
          <Item variant={"default"} size={"sm"} className={"p-0 items-start md:ml-6 flex-nowrap"}>
            <ItemContent>
              <CardTitle className={"capitalize text-xl"}>{user?.name}</CardTitle>
            </ItemContent>
            <ItemActions>
              <Button variant={"outline"} onClick={() => logout.mutate()}>
                <LogOut />
              </Button>
            </ItemActions>
          </Item>
        </div>
      </div>
      <div className={"flex flex-col w-full shadow-inner_soft bg-card"}>
        <DashboardStats />
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
};

export default Dashboard;
