// spec: specs/plan-browse.md
// scenario: BR-02 — Main navigation links are present and lead to valid pages

import { test, expect } from "../../fixtures/index";
import { HomePage } from "../../pages/HomePage";

test.describe("Browse Flow", () => {
  test("BR-02: Main navigation links are present and lead to valid pages @critical", async ({ page }) => {
    const home = new HomePage(page);

    // Navigate once to collect all nav hrefs before any link is clicked;
    // collecting up-front avoids stale-element references in the loop below
    await home.goto();

    const navLinks = await home.getNavLinkHrefs();

    // The nav must contain at least one link — an empty nav means the header
    // failed to render its menu items entirely
    expect(navLinks.length, "Expected at least one navigation link").toBeGreaterThan(0);

    for (const { text, href } of navLinks) {
      // Navigate directly rather than clicking so each iteration starts clean;
      // goto() returns the final response after redirects, giving us the real status
      const response = await page.goto(href);

      // Any 4xx/5xx means the nav points to a broken or missing page — a direct
      // user-visible failure for anyone who clicks that link
      expect(
        response?.status(),
        `Nav link "${text}" (${href}) returned HTTP ${response?.status()}`
      ).toBeLessThan(400);

      // A non-empty page title confirms the server returned a real page, not a
      // blank error. Checking the DOM for h1/main is unreliable here because
      // Cloudflare-protected pages (e.g. /MyPortal/) render a challenge widget
      // in headless mode instead of the actual page content.
      await expect(
        page,
        `Nav link "${text}" (${href}) has no page title — likely a blank error page`
      ).toHaveTitle(/.+/);
    }
  });
});
