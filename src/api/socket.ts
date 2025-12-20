import { io, type Socket } from "socket.io-client";
import { getApiBaseUrl } from "@/api/axios";

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