import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // Block common ad networks to prevent overlays interfering with tests
    await page.route(
      /doubleclick\.net|googlesyndication\.com|googleadservices\.com|google\.com\/pagead/,
      (route) => route.abort()
    );
    await use(page);
  },
});

export { expect };
