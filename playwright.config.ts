import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 3,
  reporter: "html",
  use: {
    baseURL: "https://www.gorendezvous.com",
    trace: "on-first-retry",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    locale: "en-CA",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
