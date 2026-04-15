// spec: specs/plan-search.md
// scenario: SR-03 — Search results page displays a list of matching businesses or services

import { test, expect } from "../../fixtures/index";
import { HomePage } from "../../pages/HomePage";
import { SearchResultsPage } from "../../pages/SearchResultsPage";

test.describe("Search Flow", () => {
  test("SR-03: Search results page displays a list of matching businesses or services @high", async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.goto();
    await home.search("spa");

    // The filter bar is the first visible element on the results page — wait for
    // it before asserting on cards, which load asynchronously after the page shell
    await expect(results.filterBar).toBeVisible();

    // Cards load from the API after the page shell — waitFor ensures we don't
    // count before the first card has appeared in the DOM
    await results.resultCards.first().waitFor({ state: "visible" });

    // "spa" is a broad query that should always return many listings; fewer than
    // 3 indicates a data or rendering failure, not a legitimately empty result set
    const cardCount = await results.resultCards.count();
    expect(cardCount, "Expected at least 3 result cards for query 'spa'").toBeGreaterThanOrEqual(3);

    // Each of the first 3 cards must have a visible, non-empty name —
    // an empty .h-ProfessionalName means the card shell rendered but data binding failed
    for (let i = 0; i < 3; i++) {
      const card = results.resultCards.nth(i);

      const nameEl = card.locator(results.cardNameSelector);
      await expect(nameEl).toBeVisible();
      const nameText = (await nameEl.textContent())?.trim() ?? "";
      expect(nameText.length, `Card ${i + 1} name should not be empty`).toBeGreaterThan(0);

      // Location must be present — .h-CityInfo is always rendered on the card
      const locationEl = card.locator(results.cardLocationSelector).first();
      await expect(locationEl).toBeVisible();
    }

    // At least one of the first 3 cards must show a spa-related profession —
    // .h-Profession holds the service type (e.g. "Massage Therapist") and is
    // the most targeted way to verify query relevance without scraping all text
    const professionTexts = await results.resultCards
      .locator(results.cardProfessionSelector)
      .allTextContents();
    const combined = professionTexts.join(" ").toLowerCase();
    expect(
      combined,
      "At least one result card profession should relate to the query 'spa'"
    ).toMatch(/spa|massage|beauty|salon|wellness|estheti/i);
  });
});
