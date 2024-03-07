import { defineConfig, devices, } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'], headless: false },
    // }

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless:false, viewport: { width: 1880, height: 930 } }
    },
    
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
