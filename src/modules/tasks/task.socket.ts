import type { QueryClient } from "@tanstack/react-query";
import { getSocket } from "@/api/socket.ts";
import { TASKS_QUERY_KEY } from "@/modules/tasks/task.hooks.ts";

export const registerTaskSocketEvents = (queryClient: QueryClient) => {
  const socket = getSocket();
  if (!socket) return;

  socket.on("task:created", () => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
  });

  socket.on("task:updated", () => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
  });
};
