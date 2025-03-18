import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), pluginRewriteAll()],
});
