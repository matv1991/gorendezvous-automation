import type { Page, Locator } from "@playwright/test";

export class SearchResultsPage {
  readonly page: Page;

  // The search results page has an h1#HeaderText element which resolves in the
  // DOM but is CSS-hidden — not visible to users or Playwright's toBeVisible().
  // The filter bar and search input are used instead as visibility indicators.

  // The filter bar (chips: Urgent, Gender, Location, Clientele) renders as part
  // of the results layout immediately after navigation — before result cards load.
  // It is the first visible interactive element confirming the page shell rendered.
  readonly filterBar: Locator;

  // The site retains the submitted query in this input rather than encoding it
  // in the URL — used to verify the correct term was carried to the results page
  readonly searchInput: Locator;

  // Location input — pre-filled with the submitted city when a location search
  // was performed; used to verify the geographic context was carried through
  readonly locationInput: Locator;

  // Individual result cards — confirmed from live DOM inspection.
  // The site uses h- prefixed classes as stable hook selectors.
  readonly resultCards: Locator;

  /**
   * CSS selector for the business name within each result card.
   * Confirmed from live DOM: <h2 class="h-ProfessionalName professionalName">
   */
  readonly cardNameSelector = ".h-ProfessionalName";

  /**
   * CSS selector for the profession/service type within each result card.
   * Confirmed from live DOM: <div class="h-Profession profession">
   */
  readonly cardProfessionSelector = ".h-Profession";

  /**
   * CSS selector for the city/address within each result card.
   * Confirmed from live DOM: <span class="h-CityInfo cityInfo">
   */
  readonly cardLocationSelector = ".h-CityInfo";

  constructor(page: Page) {
    this.page = page;

    // Matched by its content (the "Urgent" chip) rather than a fragile class name;
    // it is the first visible list rendered on the results page after navigation
    this.filterBar = page
      .getByRole("list")
      .filter({ has: page.getByText(/Urgent/i) })
      .first();

    // Same placeholder as the homepage input — the site reuses the same search
    // widget on the results page and pre-fills it with the submitted query.
    // .first() guards against a hidden duplicate in the sticky header.
    this.searchInput = page
      .getByPlaceholder("Profession, condition, name, ...")
      .first();

    this.locationInput = page.getByPlaceholder("City, postal code, ...").first();

    // Confirmed from live DOM inspection — each card is a div with class
    // h-ProfessionalCard. The h- prefix is the site's convention for stable
    // hook selectors, making this more reliable than a generic tag or layout class.
    this.resultCards = page.locator(".h-ProfessionalCard");
  }
}
