# Test Plan: Browse Flow

**Site**: https://www.gorendezvous.com/en  
**Flow**: Browse — exploring categories, listings, business profiles, and services without initiating a booking  
**Date**: 2026-04-14  
**Scope**: Read-only. No bookings, account creation, or form submissions that write real data.  
**Assumptions**: Each scenario starts from a fresh browser state (no cookies, no session, no prior navigation) unless noted otherwise.

---

## Scenario 1: Homepage loads with expected content

**Title**: Verify homepage renders core sections correctly

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Wait for the page to reach a fully loaded state (network idle or DOMContentLoaded).
3. Observe the page title in the browser tab.
4. Locate the main site logo or wordmark in the header area.
5. Locate the primary navigation bar or menu.
6. Locate a search input or search bar on the homepage.
7. Scroll down the page to observe below-the-fold content (category sections, featured businesses, promotional banners).
8. Locate the footer section.
9. Observe the footer for links such as "About", "Contact", "Privacy Policy", or "Terms".

**Expected outcomes**:
- The page title contains recognizable brand text (e.g., "GoRendezvous" or "gorendezvous").
- The logo or wordmark is visible and not broken (no alt-text fallback showing in place of an image).
- The navigation bar is present and contains at least one navigable link.
- A search input is present on the homepage.
- At least one content section below the header is rendered (categories, featured listings, etc.).
- The footer is present and contains at least one link.

**Success criteria**:
- All expected elements described above are present in the DOM and visible.
- No JavaScript console errors of severity "error" are observed on load.
- Page load completes within a reasonable time (no indefinite loading spinner).

**Failure criteria**:
- The page returns a non-200 HTTP status code.
- The logo image is broken or missing.
- The search input is absent.
- The footer is absent or empty.
- A full-page error message or blank white screen is shown.

---

## Scenario 2: Main navigation links are present and lead to valid pages

**Title**: Verify top-level navigation links are functional

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Locate the main navigation bar (typically in the header).
3. Identify all top-level navigation links visible in the navigation bar.
4. Record the text label and href attribute of each link.
5. For each navigation link identified:
   a. Click the link.
   b. Wait for the destination page to load.
   c. Verify the destination page returns a 200-level response and renders visible content.
   d. Navigate back to the homepage.
6. Repeat step 5 for each link found.

**Expected outcomes**:
- Each navigation link has a non-empty, non-"#" href attribute.
- Each destination page loads without a 404, 500, or other error response.
- Each destination page renders a visible heading or body content.

**Success criteria**:
- All top-level navigation links resolve to pages with visible content.
- No link results in a dead end (404 page, blank page, or error page).

**Failure criteria**:
- Any navigation link href is empty, null, or points to "#" with no JavaScript handler.
- Any destination page returns a 4xx or 5xx HTTP response.
- Any destination page is blank or shows only an error message.

---

## Scenario 3: Browse service categories from homepage

**Title**: Verify service category tiles or links are present and navigable

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Scroll down the homepage to locate a section displaying service categories (e.g., Massage, Hair, Spa, Nails, Aesthetics, etc.).
3. Count the number of category items displayed.
4. Record the label of the first visible category.
5. Click the first category item.
6. Wait for the destination page to load.
7. Verify the destination page URL has changed from the homepage URL.
8. Verify the destination page contains a heading or title that corresponds to the selected category.
9. Navigate back to the homepage.
10. Click a second, different category item.
11. Verify the destination page URL reflects the new category.
12. Verify the destination page content corresponds to the second category selected.

**Expected outcomes**:
- At least three distinct category items are visible on the homepage.
- Clicking a category navigates to a listing or results page specific to that category.
- The URL of the results page differs from the homepage URL.
- The results page heading or breadcrumb contains the category name.

**Success criteria**:
- At least two different category links each navigate to a distinct, non-error results page.
- Each results page shows content relevant to the category (listings, descriptions, or filters).

**Failure criteria**:
- No category section is found on the homepage.
- Clicking a category does not change the URL.
- The category results page is blank or shows an error.
- The results page content does not relate to the selected category.

---

## Scenario 4: Category results page displays business listings

**Title**: Verify a category results page shows a list of businesses or service providers

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate directly to a known category URL, for example `https://www.gorendezvous.com/en/massage` (or navigate via homepage category link as in Scenario 3).
2. Wait for the page to fully load.
3. Locate the listing cards, rows, or tiles that represent individual businesses or service providers.
4. Count the number of visible listings on the first page or initial load.
5. For each of the first three visible listings:
   a. Observe the business name text.
   b. Observe whether a location or city label is present.
   c. Observe whether a rating or review count is present (if applicable).
   d. Observe whether a service type or category tag is present.
6. Record the business name of the first listing.

**Expected outcomes**:
- At least one business listing card is rendered on the page.
- Each listing card contains at minimum a business name.
- Location or city information is visible on at least one listing.

**Success criteria**:
- The page renders at least one business listing with a visible name.
- The listing cards are structured consistently (same layout pattern across cards).

**Failure criteria**:
- No listing cards are rendered.
- The page shows a "no results" message on initial category load with no filtering applied.
- Listing cards render without any text content (empty cards).

---

## Scenario 5: Click through to a business profile page

**Title**: Verify clicking a listing card opens the business profile page

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and click the first available category, or navigate directly to a category URL.
2. Wait for the results page to load and display at least one listing.
3. Record the name of the first visible listing.
4. Click on the first listing card (click the business name link or the card itself).
5. Wait for the business profile page to load.
6. Observe the page URL — verify it has changed from the results page URL.
7. Locate the business name heading on the profile page.
8. Verify the business name on the profile page matches or corresponds to the listing clicked in step 3.
9. Scroll down the profile page to observe all available sections.
10. Note which of the following sections are present: business description, services list, location/address, hours of operation, photos/gallery, reviews.

**Expected outcomes**:
- Clicking a listing card navigates to a unique business profile URL.
- The business profile page displays the business name prominently.
- The profile page contains at least two of the following: description, services, address, hours, photos, reviews.

**Success criteria**:
- The profile URL is unique to the business (contains a slug or ID).
- The business name on the profile page matches the name shown on the listing card.
- The profile page renders without errors.

**Failure criteria**:
- Clicking the listing does not navigate to a new URL.
- The profile page is blank or shows an error.
- The business name on the profile page does not match the listing clicked.

---

## Scenario 6: Business profile page displays the services list

**Title**: Verify a business profile page lists available services with names and prices

**Starting state**: Fresh browser, no cookies. Navigate directly to a known business profile URL, or arrive via Scenario 5 steps.

**Steps**:
1. Navigate to a business profile page (use the path discovered in Scenario 5, or navigate via category → listing).
2. Wait for the page to fully load.
3. Locate the services section on the profile page (may be labeled "Services", "Our Services", "Menu", or similar).
4. Scroll through the services section.
5. For the first three visible services, record:
   a. Service name.
   b. Service duration (if shown).
   c. Service price (if shown).
6. Verify that at least one service entry is visible.
7. Observe whether services are grouped into categories (e.g., "Massages", "Facials") or displayed as a flat list.

**Expected outcomes**:
- A services section is present on the business profile page.
- At least one service is listed with a name.
- Service duration and/or price are shown for at least one service.

**Success criteria**:
- The services section contains at least one service item with a name.
- Price or duration information is present for at least one service.

**Failure criteria**:
- No services section is found on the profile page.
- The services section is present but empty (no service items rendered).
- Service names are blank or consist only of placeholder text.

---

## Scenario 7: Business profile page displays location information

**Title**: Verify a business profile page shows address or location details

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to a business profile page (via category → listing, or direct URL).
2. Wait for the page to fully load.
3. Scroll through the entire page looking for location-related content.
4. Locate the address block, map embed, or location section.
5. Record the street address, city, and province/postal code if displayed.
6. Check whether a Google Maps embed or map thumbnail is present.
7. If a map is present, verify the map renders (no broken iframe or placeholder).

**Expected outcomes**:
- An address or location section is present on the business profile page.
- The address contains at minimum a city name.
- If a map embed is present, it renders without errors.

**Success criteria**:
- At least a city or region is visible in the location section.
- No broken map iframes are present.

**Failure criteria**:
- No location information of any kind is present on the profile page.
- An address is shown but is clearly malformed (e.g., all placeholder text like "123 Test Street").
- A map embed is present but shows a broken iframe or error message.

---

## Scenario 8: Business profile page displays opening hours

**Title**: Verify a business profile page shows hours of operation

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to a business profile page.
2. Wait for the page to fully load.
3. Scroll through the page looking for an hours section (may be labeled "Hours", "Opening Hours", "Schedule", or similar).
4. Locate the hours table or list.
5. Verify that day labels (e.g., Monday, Tuesday, or abbreviated forms) are present.
6. Verify that time ranges (e.g., "9:00 AM – 6:00 PM") or a "Closed" label are shown for at least one day.
7. Verify that at least five days of the week are represented.

**Expected outcomes**:
- An hours section is present on the business profile page.
- Day labels and corresponding times or "Closed" indicators are shown.
- At least five days of the week are listed.

**Success criteria**:
- The hours section renders with day/time pairs for at least five days.

**Failure criteria**:
- No hours section is found.
- The hours section is present but empty.
- Only one or two days are listed with no explanation.

---

## Scenario 9: Business profile photos or gallery renders without errors

**Title**: Verify the photo gallery or images on a business profile page display correctly

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to a business profile page.
2. Wait for the page to fully load.
3. Scroll through the page to locate any image gallery, photo carousel, or hero image.
4. Verify that at least one image is visible (not broken — no alt-text fallback displayed in place of an image).
5. If a carousel or gallery is present with navigation controls (next/previous arrows or dots):
   a. Click the next-image control once.
   b. Verify the displayed image changes.
   c. Click the previous-image control once.
   d. Verify the displayed image returns or changes again.
6. Record the number of visible images or gallery items.

**Expected outcomes**:
- At least one image is visible and not broken.
- If a carousel control exists, interacting with it changes the displayed image.

**Success criteria**:
- At least one non-broken image renders on the profile page.
- Carousel navigation (if present) functions without JavaScript errors.

**Failure criteria**:
- All images on the page are broken (showing broken-image icons or alt text only).
- Clicking carousel navigation controls has no effect.
- A JavaScript error is thrown when interacting with the gallery.

---

## Scenario 10: Breadcrumb navigation on a business profile page

**Title**: Verify breadcrumb links on a business profile page are present and functional

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to a business profile page (via category → listing navigation).
2. Wait for the page to fully load.
3. Locate the breadcrumb navigation element (typically near the top of the page content, above the business name).
4. Record the text labels of each breadcrumb segment.
5. Verify the breadcrumb includes at minimum: Home > [Category] > [Business Name] (or an equivalent hierarchy).
6. Click the category-level breadcrumb link.
7. Verify the resulting page is the category results page corresponding to the category in the breadcrumb.
8. Navigate back to the business profile page.
9. Click the home-level breadcrumb link (if present).
10. Verify the resulting page is the site homepage.

**Expected outcomes**:
- A breadcrumb element is present on the business profile page.
- Breadcrumb contains at least two segments.
- Clicking a breadcrumb link navigates to the appropriate parent page.

**Success criteria**:
- The category breadcrumb link navigates to the correct category results page.
- The home breadcrumb link (if present) navigates to the homepage.

**Failure criteria**:
- No breadcrumb element is present.
- Breadcrumb links do not navigate (href is empty or "#" with no effect).
- Clicking a breadcrumb navigates to a 404 or error page.

---

## Scenario 11: Pagination on category results page

**Title**: Verify pagination controls on a category results page function correctly

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to a category results page that contains more listings than fit on one page (e.g., `https://www.gorendezvous.com/en/massage` or similar).
2. Wait for the page to fully load.
3. Scroll to the bottom of the listing results.
4. Locate pagination controls (numbered page links, "Next" button, or infinite scroll trigger).
5. If numbered pagination is present:
   a. Record the current active page number (expected: page 1).
   b. Click the "Next" or "2" page link.
   c. Wait for the next page to load.
   d. Verify the URL has changed (includes a page parameter or path segment).
   e. Verify the listing cards on page 2 are different from page 1 listings (at least one different business name).
   f. Click the "Previous" or "1" page link.
   g. Verify the page returns to page 1 listings.
6. If infinite scroll is present:
   a. Record the number of visible listings before scrolling.
   b. Scroll to the very bottom of the page.
   c. Wait for additional listings to load.
   d. Verify the number of visible listings has increased.

**Expected outcomes**:
- Pagination controls or infinite scroll is present when results exceed one page.
- Navigating to page 2 shows different listings than page 1.
- The URL updates to reflect the current page.

**Success criteria**:
- Page 2 loads and displays listings distinct from page 1.
- "Previous" navigation returns to page 1 content.

**Failure criteria**:
- No pagination control is present despite clearly having more results than one screen.
- Clicking "Next" does not change the URL or listing content.
- Page 2 and page 1 display identical listing cards.

---

## Scenario 12: Filtering results on a category results page

**Title**: Verify that filter controls on a category results page modify the displayed results

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to a category results page (e.g., massage category).
2. Wait for the page to fully load.
3. Locate any filter controls (dropdowns, checkboxes, radio buttons, sliders) such as city/neighbourhood, price range, rating, service type, or availability.
4. Record the initial number of visible listing cards.
5. Apply one filter (e.g., select a specific city or neighbourhood from a location filter).
6. Wait for the results to update (either via page reload or dynamic filtering).
7. Verify the URL has changed to reflect the applied filter (query parameter or path segment added).
8. Record the number of visible listing cards after filtering.
9. Verify the filtered results are plausibly relevant to the filter applied (e.g., if filtered by city "Montreal", all visible listings show "Montreal" as their location).
10. Clear or reset the filter (click "Clear", "Reset", or remove the filter value).
11. Verify the results return to an unfiltered or broader state.

**Expected outcomes**:
- At least one filter control is present on the category results page.
- Applying a filter changes the displayed results and updates the URL.
- Filtered results are consistent with the filter criteria.
- Clearing the filter restores a broader result set.

**Success criteria**:
- The result set changes (count or content differs) after a filter is applied.
- The URL reflects the active filter state.
- Filtered listing cards match the applied filter criterion.

**Failure criteria**:
- No filter controls are present.
- Applying a filter has no visible effect on the listings.
- The URL does not change after applying a filter.
- Filtered results contain listings that contradict the filter criterion.

---

## Scenario 13: Language toggle switches the site to French

**Title**: Verify the language switcher changes the site from English to French

**Starting state**: Fresh browser, no cookies. Site loaded in English (base URL `/en`).

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Wait for the page to fully load.
3. Locate the language switcher in the header or navigation (typically labeled "FR" or "Français").
4. Record the current page URL.
5. Click the French language option.
6. Wait for the page to reload or update.
7. Verify the URL has changed (e.g., `/en/` replaced by `/fr/` or similar).
8. Verify that visible navigation labels and heading text are now in French.
9. Locate the search bar label or placeholder and verify it is in French.
10. Navigate to a category page via the navigation.
11. Verify the category page URL is also in the French path prefix.
12. Verify visible text on the category page is in French.

**Expected outcomes**:
- Clicking the French language toggle changes the URL to use a French path prefix.
- Navigation labels, headings, and interface text switch to French.
- The French locale persists when navigating to sub-pages.

**Success criteria**:
- URL prefix changes from `/en` to `/fr` (or equivalent).
- At least three distinct UI text elements are in French after switching.
- Navigating to a sub-page maintains the French locale in the URL.

**Failure criteria**:
- Clicking the language toggle has no effect on the URL or visible text.
- The page switches URL but still renders English text.
- The French locale is lost when navigating to a sub-page.

---

## Scenario 14: Clicking the site logo from an inner page returns to homepage

**Title**: Verify the site logo link navigates back to the homepage from a deep page

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Click a category to navigate to a category results page.
3. Click a listing to navigate to a business profile page.
4. Verify the current URL is a business profile page URL (not the homepage).
5. Locate the site logo or wordmark in the header.
6. Click the site logo.
7. Wait for the resulting page to load.
8. Verify the resulting URL is the homepage URL (`https://www.gorendezvous.com/en` or equivalent).
9. Verify homepage content is rendered (search bar, category section visible).

**Expected outcomes**:
- Clicking the site logo from a business profile page navigates to the site homepage.
- The homepage renders with expected content.

**Success criteria**:
- The URL after clicking the logo matches the homepage URL.
- Homepage search and category sections are visible.

**Failure criteria**:
- Clicking the logo has no navigation effect.
- The logo navigates to an external URL or a non-homepage internal URL.
- The homepage renders with broken content after logo navigation.

---

## Scenario 15: Business profile page "Book" or CTA button is present but test does not click it

**Title**: Verify a booking call-to-action button exists on a business profile page without initiating a booking

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to a business profile page (via category → listing).
2. Wait for the page to fully load.
3. Scroll through the page to locate any prominent call-to-action button related to booking (e.g., "Book Now", "Book an Appointment", "Reserve", "Schedule").
4. Verify the button is visible in the DOM and rendered on screen.
5. Verify the button has a non-empty label that relates to booking.
6. Inspect the button's href or data attributes to confirm it links to a booking flow URL (do NOT click it).
7. Verify the button is not disabled.
8. Do NOT click the button or proceed to the booking flow.

**Expected outcomes**:
- At least one booking CTA button is present on the business profile page.
- The button is visible, enabled, and has a booking-related label.
- The button's href or action target points to a booking or appointment URL path.

**Success criteria**:
- A booking CTA button is found in the DOM with a non-empty, booking-related label.
- The button is not in a disabled state.
- The button's destination URL contains a booking-related path segment (e.g., `/book`, `/reserve`, `/appointment`).

**Failure criteria**:
- No booking CTA button is found anywhere on the profile page.
- The button is found but is in a disabled or non-interactive state with no explanation.
- The button label is blank or unrelated to booking.
