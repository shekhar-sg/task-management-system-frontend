import type {QueryClient} from "@tanstack/react-query";
import {getSocket} from "@/api/socket";
import {TASKS_QUERY_KEY} from "@/modules/tasks/task.hooks";

export const registerTaskSocketEvents = (queryClient: QueryClient) => {
  const socket = getSocket();
  if (!socket) return;

  socket.on("task:created", () => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
  });

  socket.on("task:updated", (updatedTask) => {
    console.log({updatedTask})
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
  });

  socket.on("task:deleted", () => {
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
  });

  socket.on("task:assigned", (data) => {
    console.log({data})
  });
};
