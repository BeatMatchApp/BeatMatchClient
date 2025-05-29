import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    ...(process.env.VITE_ENV !== 'dev' && {
      base: 'https://beatmatch.cs.colman.ac.il/public/client',
    }),
    plugins: [react()],
    define: {
      __VITE_SPOTIFY_SERVICE_URL__: `"${process.env.VITE_SPOTIFY_SERVICE_URL}"`,
      __VITE_BACKEND_SERVICE_URL__: `"${process.env.VITE_BACKEND_SERVICE_URL}"`,
    },
  });
};
