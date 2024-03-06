import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  base: "/",
  build: {
    outDir: 'dist', 
    sourcemap: false,
  },
  define: {
    bridgeVersion: JSON.stringify(process.env.npm_package_version),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    react({
      fastRefresh: false,
    }),
    svgr(),
    checker({
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' },
      overlay: false,
      typescript: true,
    }),
  ],
  resolve: {
    alias: [{ find: "src", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: true,
    open: false
  },
});
