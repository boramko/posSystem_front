import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/apiv2': {
        target: 'https://api.iamport.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiv2/, ''),
        secure: false,
        ws: true
      }
    }
  }
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   setupFiles: '.vitest/setup',
  //   include: ['**/test.{ts,tsx}']
  // }
})
