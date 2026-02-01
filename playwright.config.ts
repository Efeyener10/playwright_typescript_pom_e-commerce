import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',

  use: {
    baseURL: 'https://automationexercise.com',
    locale: 'en-US',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [['html', { open: 'never' }]],
});
