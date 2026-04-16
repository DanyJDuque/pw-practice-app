import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options'

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000, // 40 seconds
  globalTimeout: 60000, // 60 seconds
  expect: {
    timeout: 2000 // 2 seconds
  },
  retries: 1,
  reporter: 'html',
  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : process.env.STAGING === '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 20000,
    video: {
      mode: 'on',
      size: {
        width: 1920,
        height: 1080
      }
    }
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',

      },
    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },

    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
      },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObject.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 },
      }
    }
  ],
});
