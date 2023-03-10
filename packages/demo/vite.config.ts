import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ftl from 'vite-plugin-ftl'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tpl': path.resolve(__dirname, 'template'),
    },
  },
  plugins: [
    vue(),
    ftl({
      autoLoadData: true,
    }),
  ],
})
