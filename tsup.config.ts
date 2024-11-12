import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    publicDir: false,
    clean: true,
    minify: true,
    format: ['esm'],
    banner: {
        js: '#!/usr/bin/env node',
    },
});
