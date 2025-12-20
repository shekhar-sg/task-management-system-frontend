import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/api/socket";
import { TASKS_QUERY_KEYS } from "@/modules/tasks/task.hooks";

export const useRegisterTaskSocketEvents = () => {
  const queryClient = useQueryClient();
  const socket = getSocket();
  if (!socket) return;

  socket.on("task:created", () => {
    void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
  });

  socket.on("task:updated", () => {
    void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
  });

  socket.on("task:deleted", () => {
    void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS });
  });

  socket.on("task:assigned", (data) => {
    console.log({ data });
  });
};
