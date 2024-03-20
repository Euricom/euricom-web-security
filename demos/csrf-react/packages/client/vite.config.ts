import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: false,
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://goodwebsite.com:3000/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
