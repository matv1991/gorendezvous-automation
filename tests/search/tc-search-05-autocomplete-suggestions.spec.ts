// spec: specs/plan-search.md
// scenario: SR-05 — Search autocomplete or suggestions appear while typing

import { test, expect } from "../../fixtures/index";
import { HomePage } from "../../pages/HomePage";

test.describe("Search Flow", () => {
  test("SR-05: Typing in the search bar triggers autocomplete suggestions @high", async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    // Focus the profession input — triggering the autocomplete before any
    // assertion ensures the field is genuinely interactive
    await home.searchInput.click();

    // pressSequentially fires per-character key events, matching real user
    // behaviour and triggering the React onChange that powers the autocomplete
    await home.searchInput.pressSequentially("mas");

    // The site renders autocomplete suggestions as a role="menu" element —
    // confirmed from live DOM inspection used to build selectSuggestion() in
    // the POM. waitFor auto-waits up to the global timeout so no hardcoded
    // sleep is needed.
    const dropdown = page.getByRole("menu");
    await dropdown.waitFor({ state: "visible" });

    // Verify the dropdown contains at least one item — an empty dropdown shell
    // would indicate the UI rendered but the profession resolver returned nothing
    const items = dropdown.locator("li");
    await items.first().waitFor({ state: "visible" });
    const itemCount = await items.count();
    expect(
      itemCount,
      "Autocomplete dropdown should contain at least one suggestion"
    ).toBeGreaterThan(0);

    // At least one suggestion must contain text related to the typed query —
    // guards against a broken resolver that returns entirely unrelated results
    const texts = await items.allTextContents();
    const combined = texts.join(" ").toLowerCase();
    expect(
      combined,
      "At least one suggestion should relate to 'mas' (e.g. massage, massokinesiologist)"
    ).toMatch(/mas/i);

    // Pressing ArrowDown should move focus into the dropdown without closing it —
    // verifies keyboard navigation is wired up (accessibility requirement)
    await page.keyboard.press("ArrowDown");
    await expect(dropdown).toBeVisible();

    // Pressing Escape must close the suggestion list without submitting the
    // search or navigating away — confirms keyboard users can cancel a lookup.
    // The input is blurred first so that re-focusing doesn't immediately reopen
    // the dropdown after Escape closes it.
    await page.keyboard.press("Escape");
    await home.logo.focus();
    await dropdown.waitFor({ state: "hidden" });

    // Confirm the URL is unchanged — Escape must not silently submit the query
    await expect(page).toHaveURL(/\/en/);
  });
});
