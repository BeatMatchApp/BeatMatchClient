import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __VITE_SPOTIFY_SERVICE_URL__: `"${process.env.VITE_SPOTIFY_SERVICE_URL}"`,
  },
});
