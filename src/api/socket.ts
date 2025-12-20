import { getApiBaseUrl } from "@/api/axios";
import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

const getSocketUrl = (): string => {
    return getApiBaseUrl();
};

export const connectSocket = (): Socket => {
    if (socket?.connected) {
        console.log("Socket already connected");
        return socket;
    }

    if (socket) {
        socket.disconnect();
    }

    const socketUrl = getSocketUrl();
    console.log("Connecting to Socket.io server:", socketUrl);

    socket = io(socketUrl, {
        withCredentials: true,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ["websocket", "polling"], // Try WebSocket first, fallback to polling
    });

    socket.on("connect", () => {
        console.log("Socket.io connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
        console.log("Socket.io disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
        console.error("Socket.io connection error:", error.message);
    });

    return socket;
};

export const getSocket = (): Socket | null => {
    return socket;
};

export const disconnectSocket = (): void => {
    if (socket) {
        console.log("Disconnecting Socket.io");
        socket.disconnect();
        socket.removeAllListeners();
        socket = null;
    }
};