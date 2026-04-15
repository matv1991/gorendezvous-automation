// spec: specs/plan-search.md
// scenario: SR-02 — Submitting a keyword search navigates to a results page

import { test, expect } from "../../fixtures/index";
import { HomePage } from "../../pages/HomePage";
import { SearchResultsPage } from "../../pages/SearchResultsPage";

test.describe("Search Flow", () => {
  test("SR-02: Submitting a keyword search navigates to a results page @critical", async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.goto();

    // Capture the homepage URL before searching so we can confirm it changed;
    // a search that silently stays on /en would be a complete submission failure
    const homepageUrl = page.url();

    await home.search("massage");

    // toHaveURL auto-waits for navigation — catches the case where the button
    // click did nothing and the URL never left /en
    await expect(page).not.toHaveURL(homepageUrl);

    // The site routes all searches to /search/ without encoding the query in
    // the URL — confirms we landed on the results route, not an error page
    await expect(page).toHaveURL(/\/search\//);

    // The site pre-fills the results-page search input with the submitted query;
    // this is the only way to verify the correct term was carried through since
    // it is not encoded in the URL
    await expect(results.searchInput).toHaveValue("massage");

    // The filter bar (Urgent, Gender, Location, Clientele chips) is the first
    // visible content on the results page — it renders before result cards load.
    // Confirming it is visible proves the page shell rendered correctly.
    // NOTE: The page has an h1#HeaderText but it is CSS-hidden and cannot be
    // used with toBeVisible() — the filter bar is used instead.
    await expect(results.filterBar).toBeVisible();
  });
});
