import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`, // elimina el hash para archivos JS
        chunkFileNames: `assets/[name].js`, // elimina el hash para chunks JS
        assetFileNames: `assets/[name].[ext]`, // elimina el hash para otros assets como CSS
      },
    },
  },
});
