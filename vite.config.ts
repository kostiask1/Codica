import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import Checker from "vite-plugin-checker"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  base: "/Codica/",
  plugins: [Checker({ typescript: true }), react()],
})
