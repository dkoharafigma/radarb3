import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // `@use '@carbon/react'` resolves its internals against the load path, and Carbon's
        // own Sass emits a large volume of upstream deprecation warnings we cannot fix here.
        loadPaths: ['node_modules'],
        quietDeps: true,
        silenceDeprecations: [
          'global-builtin',
          'import',
          'slash-div',
          'color-functions',
          'legacy-js-api',
        ],
      },
    },
  },
});
