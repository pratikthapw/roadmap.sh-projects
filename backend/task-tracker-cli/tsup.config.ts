import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  format: ['cjs'],  
  minify: true,
  bundle: true,
  target: 'node16',  
  outDir: 'dist',
  shims: true,  
});
