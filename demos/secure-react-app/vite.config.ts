import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      // make sure our application is running with these headers
      // "Content-Security-Policy": "require-trusted-types-for 'script';",
      xFrameOptions: "sameorigin",
    },
  },
});
