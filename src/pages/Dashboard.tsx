import DashboardStats from "@/components/dashboard/DashboardStats";
import DaTaTable from "@/components/dashboard/DaTaTable";
import ToggleNotification from "@/components/notification/ToggleNotification";
import {ThemeToggle} from "@/components/ThemeToggle";
import {columns} from "@/components/task/columns";
import {ButtonGroupSeparator} from "@/components/ui/button-group";
import {useTaskFilters, useTasks} from "@/modules/tasks";
import {useTaskStore} from "@/modules/tasks/task.store";
import {useEffect} from "react";
import {Item, ItemActions, ItemContent, ItemMedia} from "@/components/ui/item";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {LogOut, User2} from "lucide-react";
import {CardDescription, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useAuthStore, useLogout} from "@/modules/auth";

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
      <div className={"flex items-center bg-background justify-between min-h-16 px-6"}>
        <h6 className={"text-xl"}>Dashboard</h6>
        <div className={"flex gap-4 items-center"}>
          <ThemeToggle />
          <ButtonGroupSeparator />
          <ToggleNotification />
        </div>
        <Item variant={"default"} size={"sm"}>
          <ItemMedia>
            <Avatar>
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </ItemContent>
          <ItemActions>
            <Button variant={"outline"} onClick={() => logout.mutate()}>
              <LogOut />
            </Button>
          </ItemActions>
        </Item>
      </div>
      <div className={"flex flex-col w-full h-full shadow-inner_soft bg-card"}>
        <DashboardStats />
        <DaTaTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
};

export default Dashboard;
