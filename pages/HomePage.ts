import type { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // Header region
  readonly logo: Locator;
  readonly nav: Locator;
  // All anchor links directly inside the header (logo + top-right nav items).
  // The site has no <nav> element — links sit directly in <header>.
  readonly navLinks: Locator;

  // Cookie consent banner
  readonly cookieBannerRejectBtn: Locator;

  // Search
  readonly searchInput: Locator;
  readonly locationInput: Locator;
  readonly searchButton: Locator;

  // Below-the-fold content
  readonly mainContent: Locator;

  // Footer
  readonly footer: Locator;
  readonly footerLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logo = page.getByRole("link", { name: /gorendezvous/i }).first();

    // The site uses generic <div> elements instead of a semantic <header>.
    // The nav list is the <ul> that contains the "List my practice" link —
    // it sits at the top of the page alongside the logo.
    this.nav = page
      .getByRole("list")
      .filter({ has: page.getByRole("link", { name: /list my practice/i }) })
      .first();
    // Collect all links inside the top nav list (excludes logo but includes
    // all real nav destinations: "List my practice", language switcher, etc.)
    this.navLinks = this.nav.locator("a[href]");

    // Cookie consent modal — always "Reject All" to avoid accepting tracking
    this.cookieBannerRejectBtn = page.getByRole("button", {
      name: /reject all/i,
    });

    // The search input is a plain textbox — confirmed from page snapshot.
    // .first() is required because the site renders a second hidden copy of the
    // same input (sticky header / mobile widget) with the identical placeholder.
    this.searchInput = page
      .getByPlaceholder("Profession, condition, name, ...")
      .first();
    // Confirmed from homepage snapshot — second input in the search form
    this.locationInput = page
      .getByPlaceholder("City, postal code, ...")
      .first();
    // .first() for the same reason as searchInput — hidden duplicate in sticky header
    this.searchButton = page.getByRole("button", { name: "Search" }).first();

    this.mainContent = page.locator("main, #main, [role='main']").first();

    this.footer = page.locator("footer").first();
    this.footerLinks = this.footer.locator("a[href]");
  }

  async goto(): Promise<void> {
    await this.page.goto("/en");
    await this.dismissCookieBanner();
  }

  /**
   * Dismisses the cookie consent banner if it appears.
   * The banner does not always appear (e.g. if consent was already given in a
   * prior context), so the wait has a short timeout and failures are swallowed.
   */
  async dismissCookieBanner(): Promise<void> {
    try {
      await this.cookieBannerRejectBtn.waitFor({
        state: "visible",
        timeout: 5_000,
      });
      await this.cookieBannerRejectBtn.click();
      // Wait for the overlay to disappear before the test continues
      await this.cookieBannerRejectBtn.waitFor({ state: "hidden" });
    } catch {
      // Banner did not appear — already dismissed or not present on this page
    }
  }

  /**
   * Selects a suggestion from an autocomplete dropdown by its exact visible text.
   * Used internally by search() and searchWithLocation().
   * Both the profession and location fields use autocomplete dropdowns —
   * typing alone submits unresolved free text which the site may not filter correctly.
   */
  private async selectSuggestion(suggestionText: string): Promise<void> {
    // Scope to the autocomplete dropdown (role="menu") to avoid matching other
    // text on the page. Both the location geo-resolver and profession resolver
    // render their options inside a role="menu" element.
    const dropdown = this.page.getByRole("menu");
    const exactMatch = dropdown
      .getByText(suggestionText, { exact: true })
      .first();

    // The site's autocomplete API serves suggestions in French or English based
    // on IP geolocation (Quebec IP → French), regardless of the browser locale
    // header. Try the caller-specified text first; if it doesn't appear within a
    // short window (different locale), fall back to clicking the first available
    // suggestion link — which is the correct profession/location for the typed
    // query, just spelled differently.
    let suggestion = exactMatch;
    try {
      await exactMatch.waitFor({ state: "visible", timeout: 5_000 });
    } catch {
      // Locale fallback: click the first <a> element in the dropdown regardless
      // of its displayed text. For profession, this is the first Professions-
      // category item; for location, it is the first geo-resolved result.
      suggestion = dropdown.locator("li a").first();
      await suggestion.waitFor({ state: "visible" });
    }

    await suggestion.click();
    // Wait for the dropdown to close — this confirms the selection event was
    // processed by React before any further field interaction fires
    await dropdown.waitFor({ state: "hidden" });
  }

  /**
   * Types a query into the profession field, optionally selects a dropdown
   * suggestion, then submits.
   *
   * @param query      Text to type into the profession/name field
   * @param suggestion Optional exact suggestion text to select from the dropdown
   *                   (e.g. "Massage Therapist"). Omit only when the query does
   *                   not need to resolve to a specific profession or service.
   */
  async search(query: string, suggestion?: string): Promise<void> {
    // pressSequentially fires per-character key events (keydown/input/keyup),
    // which React controlled inputs need to update their state.
    // fill() sets the DOM value directly and React's onChange never fires,
    // causing the form to submit with an empty query.
    await this.searchInput.click();
    await this.searchInput.pressSequentially(query);
    if (suggestion) await this.selectSuggestion(suggestion);
    await this.searchButton.click();
  }

  /**
   * Types into both the profession and location fields, selects their respective
   * autocomplete suggestions, then submits.
   *
   * Both fields use dropdowns backed by resolvers — profession resolves to a
   * matched profession/service type, location resolves via a geo-resolver.
   * Submitting without selecting from either dropdown sends unresolved free text.
   *
   * @param professionTyped      Partial text to type into the profession field
   * @param professionSuggestion Exact suggestion to select (e.g. "Massage Therapist")
   * @param locationTyped        Partial text to type into the location field (e.g. "montr")
   * @param locationSuggestion   Exact suggestion to select (e.g. "Montreal, QC, Canada")
   */
  async searchWithLocation(
    professionTyped: string,
    professionSuggestion: string,
    locationTyped: string,
    locationSuggestion: string
  ): Promise<void> {
    // Fill location FIRST — selecting the profession suggestion auto-submits the
    // search, so location must already be resolved before profession is selected
    await this.locationInput.click();
    await this.locationInput.pressSequentially(locationTyped);
    await this.selectSuggestion(locationSuggestion);

    await this.searchInput.click();
    await this.searchInput.pressSequentially(professionTyped);
    await this.selectSuggestion(professionSuggestion);
  }

  /**
   * Collects href + visible text for every link in the primary nav.
   * Must be called while still on the homepage — hrefs are extracted up-front
   * so the test loop can navigate away without hitting stale-element errors.
   */
  async getNavLinkHrefs(): Promise<{ text: string; href: string }[]> {
    // Wait for a known real nav link to be visible before collecting all links.
    // Using a specific link avoids relying on the combined .or() locator ordering.
    await this.page
      .getByRole("link", { name: /list my practice/i })
      .first()
      .waitFor({ state: "visible" });
    const all = await this.navLinks.all();
    const result: { text: string; href: string }[] = [];
    for (const link of all) {
      const href = await link.getAttribute("href");
      const text = (await link.textContent())?.trim() ?? "";
      // Skip non-navigation hrefs: anchor-only (#), javascript: pseudo-links,
      // and empty hrefs — these are dropdown triggers or in-page anchors
      if (
        href &&
        href !== "#" &&
        !href.startsWith("#") &&
        !href.startsWith("javascript:")
      ) {
        result.push({ text, href });
      }
    }
    return result;
  }
}
