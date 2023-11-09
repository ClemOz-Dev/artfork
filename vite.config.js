// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite"
// eslint-disable-next-line import/no-extraneous-dependencies
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
