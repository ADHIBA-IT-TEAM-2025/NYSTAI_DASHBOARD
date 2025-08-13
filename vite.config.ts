import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
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
  base: "/", // Ensure correct base path for SPA deployment
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Dev server handles React Router fallback
  },
});
