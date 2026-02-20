import { defineConfig } from 'tsup';

export default defineConfig([
  // Core entry (framework-agnostic)
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'zustand'],
  },
  // React entry (requires react + zustand peer deps)
  {
    entry: { 'react/index': 'src/react/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    external: ['react', 'zustand'],
  },
]);
