import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  socket = io(import.meta.env.VITE_API_BASE_URL.replace("/api", ""), {
    withCredentials: true,
    autoConnect: true,
  });
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => socket?.disconnect();
