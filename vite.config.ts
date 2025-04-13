import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import path from "node:path";
import { defineConfig } from "vite";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": process.env,
  },

  build: {
    cssMinify: "esbuild",
    minify: true,
    rollupOptions: {
      output: {
        compact: true,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "react";
            }
            if (id.includes("tailwindcss")) {
              return "tailwindcss";
            }
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
