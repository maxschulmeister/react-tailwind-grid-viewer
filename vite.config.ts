import react from "@vitejs/plugin-react";
import path from "path";
import preserveDirectives from "rollup-preserve-directives";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig((env) => ({
  define:
    env.command === "build"
      ? { "process.env.NODE_ENV": "'production'" }
      : undefined,

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.ts"),
      name: "react-tailwind-grid-viewer",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    emptyOutDir: true,
  },
  plugins: [
    preserveDirectives(),
    react(),
    dts({
      rollupTypes: true,
    }),
  ],
}));
