import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __SPOTIFY_SERVICE_URL__: `"${process.env.SPOTIFY_SERVICE_URL}"`,
  },
});
