import { TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/modules/auth";
import { useGetAllNotifications } from "@/modules/notifications/notification.hooks";
import { useTasks } from "@/modules/tasks";
import { useTaskStore } from "@/modules/tasks/task.store";
import { useGlobalStore } from "@/stores/global.store";

const DashboardStats = () => {
  const { setFilters, filters } = useTaskStore();

  const userId = useAuthStore((state) => state.userId);
  const { data } = useGetAllNotifications();
  const { data: tasks = [] } = useTasks();
  const openContextPanel = useGlobalStore((state) => state.openContextPanel);

  const stats = useMemo(() => {
    const created = tasks.filter((t) => t.creatorId === userId).length;
    const assigned = tasks.filter((t) => t.assignedToId === userId).length;
    const overdue = tasks.filter((t) => {
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < new Date();
    }).length;

    return {
      created,
      assigned,
      overdue,
    };
  }, [tasks, userId]);

  const cardStats = [
    {
      statFor: "CREATED",
      title: "Total Tasks Created",
      value: stats.created,
      trend: "+12.5%",
      trendIcon: <TrendingUp />,
      description: "That you have created",
      actionFor: "",
      action: () => {
        setFilters({ view: "CREATED" });
      },
    },
    {
      statFor: "ASSIGNED",
      title: "Total Tasks Assigned",
      value: stats.assigned,
      trend: "-8.3%",
      trendIcon: <TrendingDown />,
      description: "That are assigned to you",
      action: () => {
        setFilters({ view: "ASSIGNED" });
      },
    },
    {
      statFor: "OVERDUE",
      title: "Overdue Tasks",
      value: stats.overdue,
      trend: "+5.0%",
      trendIcon: <TrendingUp />,
      description: "That are overdue",
      action: () => {
        setFilters({ overdue: true });
      },
    },
    {
      statFor: "NOTIFICATIONS",
      title: "Notifications",
      value: data ? data.length : 0,
      trend: "+20.0%",
      trendIcon: <TrendingUp />,
      description: "Total notifications received",
      action: () => {
        openContextPanel("NOTIFICATIONS");
      },
    },
  ];

  return (
    <div className="flex items-stretch h-72 gap-4 p-4 overflow-x-scroll">
      {cardStats.map((card) => {
        return (
          <Card
            className={cn(
              "aspect-video w-96",
              card.statFor === "CREATED" && "bg-purple-200 dark:bg-purple-900",
              card.statFor === "ASSIGNED" && "bg-blue-200 dark:bg-blue-900",
              card.statFor === "OVERDUE" && "bg-red-200 dark:bg-red-900",
              card.statFor === "NOTIFICATIONS" && "bg-green-200 dark:bg-green-900",
              filters?.view?.includes("CREATED")  && card.statFor === "CREATED" && "border-white dark:border-white",
              filters?.view?.includes("ASSIGNED") && card.statFor === "ASSIGNED" && "border-white dark:border-white",
              filters?.overdue && card.statFor === "OVERDUE" && "border-white dark:border-white"
            )}
            key={card.title + card.value}
          >
            <CardHeader className={"flex-row justify-between items-start"}>
              <div>
                <CardTitle className={"text-2xl"}>{card.title}</CardTitle>
                <CardDescription className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {card.value}
                </CardDescription>
              </div>
              <Badge>
                <TrendingUp />
                +12.5%
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="line-clamp-1 flex gap-2 font-medium">
                The tasks <TrendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">{card.description}</div>
            </CardContent>
            <CardFooter className="items-center justify-between gap-1.5 text-sm">
              <CardDescription className={"text-lg font-semibold"}>
                Check all {card.statFor.toLowerCase()}
              </CardDescription>
              <Button
                variant={"default"}
                size={"default"}
                className={"bg-card font-bold shadow-success text-success-foreground"}
                onClick={card.action}
              >
                Show in list
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
