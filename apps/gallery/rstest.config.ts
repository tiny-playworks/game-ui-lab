import { defineConfig } from '@rstest/core';

export default defineConfig({
  include: ['src/**/*.{test,spec}.{ts,tsx}'],
  testEnvironment: 'happy-dom',
});
