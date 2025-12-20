import { getSocket } from "@/api/socket";
import { TASKS_QUERY_KEYS } from "@/modules/tasks/task.hooks";
import type { Task } from "@/modules/tasks/task.types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegisterTaskSocketEvents = () => {
  const queryClient = useQueryClient();
  const socket = getSocket();
  if (!socket) return;

  socket.on("task:updated", (task: Task) => {
    void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
    toast.info("Task updated", {
      description: `"${task.title}" has been updated`,
    });
  });

  socket.on("task:deleted", (data: { title: string; deleted: boolean }) => {
    void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
    toast.error("Task deleted", {
      description: `"${data.title}" has been deleted`,
    });
  });

  socket.on("task:assigned", (data: { assignedBy: string; title: string }) => {
    void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
    toast.success("Task assigned", {
      description: `"${data.title}" has been assigned to ${data.assignedBy}`,
    });
  });

  socket.on("connect", () => {
    toast.success("Connected", {
      description: "Real-time updates enabled",
    });
  });

  socket.on("disconnect", (reason) => {
    toast.warning("Disconnected", {
      description: `Connection lost: ${reason}`,
    });
  });

  socket.on("reconnect", (attemptNumber) => {
    toast.success("Reconnected", {
      description: `Connection restored after ${attemptNumber} attempt(s)`,
    });
  });

  socket.on("connect_error", (error) => {
    toast.error("Connection error", {
      description: error.message || "Unable to connect to server",
    });
  });
};
