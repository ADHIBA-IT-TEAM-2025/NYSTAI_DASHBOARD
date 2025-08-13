import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  base: "/", // <-- Important: base path for your app
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 5173,
  },
});
