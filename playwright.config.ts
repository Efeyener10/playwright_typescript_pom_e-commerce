import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Fail the run if a `test.only` slips into a commit.
  forbidOnly: isCI,
  // Retries only on CI: locally you want to see flakiness, not hide it.
  retries: isCI ? 2 : 0,
  // automationexercise.com is a free shared demo site: it answers 503 or a
  // "queue full" page when hammered. Two workers keeps us polite and stable.
  workers: 2,
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
    // Honor a corporate/CI proxy if one is set. Browsers pick it up, but the
    // API `request` fixture only uses a proxy when it is configured here.
    proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
    // Keep evidence for failed tests only (works with or without retries).
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // API tests use the `request` fixture only; no browser is launched.
      name: 'api',
      testDir: './tests/api',
    },
  ],
});
