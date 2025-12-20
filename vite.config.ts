import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const backendUrl = process.env.VITE_API_BASE_URL || "http://localhost:8080";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: `${backendUrl}`,
        changeOrigin: true,
      },
      "/socket.io": {
        target: backendUrl,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
