import type { QueryClient } from "@tanstack/react-query";
import { getSocket } from "@/api/socket";
import { TASKS_QUERY_KEYS } from "@/modules/tasks/task.hooks";

export const registerTaskSocketEvents = (queryClient: QueryClient) => {
  const socket = getSocket();
  if (!socket) return;

  socket.on("task:created", () => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
  });

  socket.on("task:updated", (updatedTask) => {
    console.log({ updatedTask });
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
  });

  socket.on("task:deleted", () => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
  });

  socket.on("task:assigned", (data) => {
    console.log({ data });
  });
};
