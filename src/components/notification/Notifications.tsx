import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetAllNotifications, useMarkAsRead } from "@/modules/notifications/notification.hooks";
import type { Notification } from "@/modules/notifications/notinication.type";
import { useTaskStore } from "@/modules/tasks";
import { useGlobalStore } from "@/stores/global.store";
import { BellRing, CheckCircle2Icon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";

const Notifications = () => {
  const { data, isLoading } = useGetAllNotifications();
  const notifications = data ?? [];
  const { setSelectedTaskId } = useTaskStore();
  const openContextPanel = useGlobalStore((state) => state.openContextPanel);
  const markAsRead = useMarkAsRead();
  const handleMarkAsRead = (id: string) => {
    markAsRead.mutate(id, {
      onSuccess: () => {
        toast.success("Notification marked as read");
      },
    });
  };
  const handleShowDetails = (id: string) => {
    setSelectedTaskId(id);
    openContextPanel("TASK_DETAILS");
  };

  if (isLoading) return <div>Loading notifications...</div>;

  return (
    <ScrollArea className={"h-full w-full gap-2 p-3"}>
      <div className={"space-y-3"}>
        {notifications.map((notification) => (
          <NotificationCard
            notification={notification}
            key={notification.id}
            markAsRead={handleMarkAsRead}
            showDetails={() => handleShowDetails(notification.taskId)}
            loading={markAsRead.variables === notification.id}
          />
        ))}
      </div>
      <ScrollBar orientation={"vertical"} />
    </ScrollArea>
  );
};

export default Notifications;

interface NotificationCardProps {
  notification: Notification;
  markAsRead?: (id: string) => void;
  showDetails?: () => void;
  loading?: boolean;
}

const NotificationCard = (props: NotificationCardProps) => {
  const { notification, markAsRead, showDetails, loading } = props;
  return (
    <Card key={notification.id} className={"p-2"}>
      <div className={"flex gap-2 p-2 items-start"}>
        {notification.isRead ? <CheckCircle2Icon color={"green"} /> : <BellRing color={"red"} />}
        <h6>{notification.type}</h6>
      </div>
      <CardContent className={"py-1"}>
        <CardDescription className={"text-lg"}>{notification.message}</CardDescription>
      </CardContent>
      <CardFooter className={"gap-4 p-1"}>
        <Button variant={"outline"} className={"w-full"} onClick={showDetails}>
          Show Details
        </Button>
        {!notification.isRead && (
          <Button
            variant={"default"}
            className={"w-full"}
            onClick={() => markAsRead?.(notification.id)}
            disabled={loading}
          >
            {loading && <LoaderIcon className={"animate-spin"} role={"status"} />} Mark as Read
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
