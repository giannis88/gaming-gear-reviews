import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/gaming-gear-reviews/',
    build: {
        outDir: 'dist',
        sourcemap: true
    }
});
