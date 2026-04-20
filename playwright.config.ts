import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options'


require('dotenv').config();

export default defineConfig<TestOptions>({
  // timeout: 40000, // 40 seconds
  // globalTimeout: 60000, // 60 seconds
  expect: {
    timeout: 2000, // 2 seconds,
    toMatchSnapshot: { maxDiffPixels: 50 }
  },

  retries: 1,
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      ({
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        // token: "<YOUR-ARGOS-TOKEN>",        
        token: process.env.ARGOS_TOKEN,
      }),
    ],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml' }],
    // ['allure-playwright'],
    ['html']
  ],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : process.env.STAGING === '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
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
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    timeout: 120000, // 2 minutes
    url: 'http://localhost:4200/'
  }
});
