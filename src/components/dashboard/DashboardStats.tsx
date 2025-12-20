import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/modules/auth";
import { useGetAllNotifications } from "@/modules/notifications/notification.hooks";
import { useTasks } from "@/modules/tasks";
import { useTaskStore } from "@/modules/tasks/task.store";
import { useGlobalStore } from "@/stores/global.store";

const DashboardStats = () => {
  const { setFilters, filters } = useTaskStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useAuthStore((state) => state.userId);
  const { data } = useGetAllNotifications();
  const { data: tasks = [] } = useTasks();
  const openContextPanel = useGlobalStore((state) => state.openContextPanel);
  const isBelowLg = useMediaQuery({ maxWidth: 1024 });
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

  const selectedValues = searchParams.get("view")?.split(",") || [];

  const clearFilters = useCallback(() => {
    searchParams.delete("view");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const toggleValue = useCallback(
    (value: string) => {
      const current = new Set(selectedValues);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      if (current.size === 0) {
        clearFilters();
        return;
      }
      searchParams.set("view", Array.from(current).join(","));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, selectedValues, clearFilters]
  );

  const cardStats = useMemo(
    () => [
      {
        statFor: "CREATED",
        title: "Created By You",
        value: stats.created,
        description: "That you have created",
        actionFor: "",
        action: () => {
          toggleValue("CREATED");
          setFilters({ view: "CREATED" });
        },
      },
      {
        statFor: "ASSIGNED",
        title: "Assigned To You",
        value: stats.assigned,
        description: "That are assigned to you",
        action: () => {
          toggleValue("ASSIGNED");
          setFilters({ view: "ASSIGNED" });
        },
      },
      {
        statFor: "OVERDUE",
        title: "Overdue Tasks",
        value: stats.overdue,
        description: "That are overdue",
        action: () => {
          searchParams.has("overdue") ? searchParams.delete("overdue") : searchParams.set("overdue", "true");
          setSearchParams(searchParams);
          setFilters({ overdue: true });
        },
      },
      {
        statFor: "NOTIFICATIONS",
        title: "Notifications Received",
        value: data ? data.length : 0,
        description: "Total notifications received",
        action: () => {
          openContextPanel("NOTIFICATIONS");
        },
      },
    ],
    [
      data,
      openContextPanel,
      setFilters,
      stats.assigned,
      stats.created,
      stats.overdue,
      toggleValue,
      searchParams,
      setSearchParams,
    ]
  );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
      {cardStats.map((card) => {
        const isCreatedActive = card.statFor === "CREATED" && filters?.view?.includes("CREATED");
        const isAssignedActive = card.statFor === "ASSIGNED" && filters?.view?.includes("ASSIGNED");
        const isOverdueActive = card.statFor === "OVERDUE" && filters?.overdue;
        const isActive = isCreatedActive || isAssignedActive || isOverdueActive;

        return (
          <Card
            key={card.title + card.value}
            className={cn(
              "transition-all duration-200 ease-in-out active:scale-[0.98]",
              clsx({
                // Mobile/Tablet behavior
                "cursor-pointer hover:scale-[1.02] hover:shadow-lg": isBelowLg,
                "hover:shadow-md": !isBelowLg,

                // Base colors
                "bg-purple-100 dark:bg-purple-950 border-purple-300 dark:border-purple-800":
                  card.statFor === "CREATED",
                "bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800": card.statFor === "ASSIGNED",
                "bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800": card.statFor === "OVERDUE",
                "bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800":
                  card.statFor === "NOTIFICATIONS",

                // Active state
                "ring-2 ring-offset-2 shadow-lg": isActive,

                // Active state colors
                "ring-purple-500 dark:ring-purple-400 bg-purple-200 dark:bg-purple-900": isCreatedActive,
                "ring-blue-500 dark:ring-blue-400 bg-blue-200 dark:bg-blue-900": isAssignedActive,
                "ring-red-500 dark:ring-red-400 bg-red-200 dark:bg-red-900": isOverdueActive,
              })
            )}
            {...(isBelowLg && { onClick: card.action, role: "button", tabIndex: 0 })}
          >
            <CardHeader className="p-3 sm:p-6 space-y-0">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <CardTitle className="text-xs sm:text-base lg:text-lg font-semibold line-clamp-2 leading-tight">
                  {card.title}
                </CardTitle>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tabular-nums tracking-tight">
                  {card.value}
                </div>
              </div>
            </CardHeader>
            <CardFooter className="hidden md:flex items-center justify-between gap-1.5 text-sm pt-0 pb-4 px-6">
              <CardDescription className="text-xs sm:text-sm font-medium">
                Check all {card.statFor.toLowerCase()}
              </CardDescription>
              <Button
                variant="default"
                size="sm"
                className="font-semibold shadow-sm hover:shadow-md transition-shadow text-xs"
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
