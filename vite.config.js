// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite"
// eslint-disable-next-line import/no-extraneous-dependencies
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
})
