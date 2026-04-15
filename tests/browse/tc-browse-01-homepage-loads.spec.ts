// spec: specs/plan-browse.md
// scenario: BR-01 — Homepage loads with expected content

import { test, expect } from "../../fixtures/index";
import { HomePage } from "../../pages/HomePage";

test.describe("Browse Flow", () => {
  test("BR-01: Homepage loads with expected content @critical", async ({ page }) => {
    const home = new HomePage(page);

    // Navigate to the English homepage; baseURL is set in playwright.config.ts
    await home.goto();

    // The page title must be non-empty and meaningful — a blank or generic fallback title
    // ("Untitled", "localhost", etc.) signals a meta-tag or SSR failure
    await expect(page).toHaveTitle("Find a professional");

    // The logo anchors the header and is the primary brand signal — a broken or missing
    // logo indicates a critical asset failure
    await expect(home.logo).toBeVisible();

    // The navigation must exist and carry at least one link; an empty nav means the site
    // is effectively unnavigable from the homepage
    await expect(home.nav).toBeVisible();
    await expect(home.navLinks.first()).toBeVisible();

    // The search bar is the primary entry point for finding services — its absence is a
    // critical regression on the homepage
    await expect(home.searchInput).toBeVisible();

    // Main content (categories / featured listings) must render below the header;
    // a blank main region signals a JS hydration failure or missing data
    await expect(home.mainContent).toBeVisible();

    // The footer is required for legal and support links; its absence may indicate a
    // full-page render error that only affected the bottom of the document
    await expect(home.footer).toBeVisible();

    // At least one footer link must be present — an empty footer gives users no
    // path to policy or contact pages
    await expect(home.footerLinks.first()).toBeVisible();
  });
});
