import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'task-tracker': 'src/task-tracker/task-tracker.ts',
    'github-activity': 'src/github-activity/github-activity.ts',
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false,
  format: ['cjs'],
  minify: true,
  bundle: true,
  target: 'node16',
  outDir: 'dist',
  shims: true,
});
