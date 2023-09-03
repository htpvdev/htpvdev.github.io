import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://htpvdev.github.io/contents/food/dist",
  plugins: [react()],
})
