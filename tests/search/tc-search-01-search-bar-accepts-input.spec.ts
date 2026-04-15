// spec: specs/plan-search.md
// scenario: SR-01 — Search bar is present and accepts input on the homepage

import { test, expect } from "../../fixtures/index";
import { HomePage } from "../../pages/HomePage";

test.describe("Search Flow", () => {
  test("SR-01: Search bar is present and accepts input on the homepage @critical", async ({ page }) => {
    const home = new HomePage(page);

    // Navigate and dismiss the cookie banner before any assertions
    await home.goto();

    // The search bar is the primary entry point for the site — its absence is a
    // critical regression that makes the homepage functionally useless
    await expect(home.searchInput).toBeVisible();

    // Clicking must move focus into the field; if it doesn't, keyboard input
    // will go nowhere and the search bar is effectively non-interactive
    await home.searchInput.click();
    await expect(home.searchInput).toBeFocused();

    // fill() triggers the same input/change events as real typing and is the
    // Playwright-recommended way to enter text reliably
    await home.searchInput.fill("massage");

    // The value must reflect what was entered — catches cases where the field
    // visually shows text but its value is not updated (controlled-input bugs)
    await expect(home.searchInput).toHaveValue("massage");

    // Clear via fill('') — equivalent to select-all + delete and verifies the
    // field can be reset without a page reload (important for repeat searches)
    await home.searchInput.fill("");

    // An empty value confirms the field is truly cleared and ready for a new
    // query, not just visually blank while retaining the old value
    await expect(home.searchInput).toHaveValue("");
  });
});
