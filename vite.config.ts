import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      providerImportSource: "@mdx-js/react",
    }),
  ],

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
