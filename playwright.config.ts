import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  // Fail the run if a `test.only` slips into a commit.
  forbidOnly: isCI,
  // Retries only on CI: locally you want to see flakiness, not hide it.
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },

  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  use: {
    // Page objects navigate with relative paths, so this is the only place the URL lives.
    baseURL: process.env.BASE_URL ?? 'https://automationexercise.com',
    locale: 'en-US',
    testIdAttribute: 'data-qa',
    // Keep evidence for failed tests only (works with or without retries).
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'ui',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
