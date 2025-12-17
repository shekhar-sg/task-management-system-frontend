import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token?: string) => {
  socket = io(import.meta.env.VITE_API_BASE_URL.replace("/api", ""), {
    auth: { token },
  });
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => socket?.disconnect();
