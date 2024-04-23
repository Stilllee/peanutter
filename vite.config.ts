import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      firebaseApp: "/src/firebaseApp",
      context: "/src/context",
      atom: "/src/atom",
      constants: "/src/constants",
      hooks: "/src/hooks",
    },
  },
});
