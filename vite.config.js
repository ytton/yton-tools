import { defineConfig } from 'vite';
import path from 'path';
import pkg from './package';
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'ytonTools',
      fileName: 'yton-tools'
    },
    sourcemap: true,
    rollupOptions: {
      external: ['axios'],
      output: {
        globals: {
          axios: 'axios'
        }
      }
    }
  }
});
