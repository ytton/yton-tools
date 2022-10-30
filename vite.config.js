import { defineConfig } from 'vite';
import path from 'path';
import pkg from './package';
export default defineConfig({
  resolve: {
    alias: {
      '@yton-tools': path.resolve(__dirname, './packages/')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'ytonTools',
      fileName: 'yton-tools',
      formats: ['cjs', 'es', 'umd']
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
