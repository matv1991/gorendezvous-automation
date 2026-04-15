// spec: specs/plan-search.md
// scenario: SR-04 — Search with a location-specific query returns geographically relevant results

import { test, expect } from "../../fixtures/index";
import { HomePage } from "../../pages/HomePage";
import { SearchResultsPage } from "../../pages/SearchResultsPage";

test.describe("Search Flow", () => {
  test("SR-04: Search with a location-specific query returns geographically relevant results @critical", async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.goto();

    // Both the profession and location fields use autocomplete dropdowns backed
    // by resolvers — an explicit suggestion selection is required in each field
    // for the search to filter correctly
    await home.searchWithLocation(
      "massage", "Massage Therapist",
      "montr",   "Montreal, QC, Canada"
    );

    // Confirm navigation reached the results route — catches a silent failure
    // where the button click had no effect and the URL never changed
    await expect(page).toHaveURL(/\/search\//);

    // Wait for the results page shell before asserting on cards, which load
    // asynchronously after the page shell renders
    await expect(results.filterBar).toBeVisible();
    await results.resultCards.first().waitFor({ state: "visible" });

    // At least one card must show a Montreal location — regex covers both the
    // English spelling ("Montreal") and French ("Montréal") used on the site
    const cityTexts = await results.resultCards
      .locator(results.cardLocationSelector)
      .allTextContents();

    const hasMontrealResult = cityTexts.some((text) =>
      /montr[eé]al/i.test(text)
    );
    expect(
      hasMontrealResult,
      "At least one result card should show a Montreal location"
    ).toBe(true);

    // No card should show a location entirely outside Quebec — guards against
    // the location filter being silently ignored and returning national results
    const allOutsideQuebec = cityTexts.every((text) =>
      /toronto|vancouver|calgary|ottawa/i.test(text)
    );
    expect(
      allOutsideQuebec,
      "Results should not be entirely from cities outside Quebec"
    ).toBe(false);
  });
});
