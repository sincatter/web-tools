import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // 如果是来自 node_modules 的库，单独打包
                    if (id.includes('node_modules')) {
                        return id
                          .toString()
                          .split('node_modules/')[1]
                          .split('/')[0]
                          .toString();
                    }
                },
            },
        },
    },
});
