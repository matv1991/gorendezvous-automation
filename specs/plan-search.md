# Test Plan: Search Flow

**Site**: https://www.gorendezvous.com/en  
**Flow**: Search — using the search bar and search results page to find businesses and services  
**Date**: 2026-04-14  
**Scope**: Read-only. No bookings, account creation, or form submissions that write real data.  
**Assumptions**: Each scenario starts from a fresh browser state (no cookies, no session, no prior navigation) unless noted otherwise.

---

## Scenario 1: Search bar is present and accepts input on the homepage

**Title**: Verify the homepage search bar renders and accepts keyboard input

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Wait for the page to fully load.
3. Locate the primary search bar on the homepage.
4. Click into the search input field to give it focus.
5. Verify the input field receives focus (cursor is active inside the field).
6. Type the text "massage" using the keyboard.
7. Verify the typed text appears in the input field.
8. Clear the input field (select all and delete, or use keyboard shortcut).
9. Verify the input field is now empty.

**Expected outcomes**:
- A search input field is present on the homepage.
- The field accepts focus on click.
- Typed characters appear in the field.
- The field can be cleared.

**Success criteria**:
- The input field is visible and interactive.
- Text entered via keyboard is reflected in the field value.
- The field can be emptied without page reload.

**Failure criteria**:
- No search input field is found on the homepage.
- The field does not accept focus or keyboard input.
- Typed characters do not appear in the field.

---

## Scenario 2: Submitting a keyword search navigates to a results page

**Title**: Verify submitting a search query via the homepage search bar navigates to a search results page

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Wait for the page to fully load.
3. Locate the primary search bar.
4. Click into the search input field.
5. Type the query "massage".
6. Press the Enter key or click the search submit button (magnifying glass icon or "Search" button).
7. Wait for the resulting page to load.
8. Verify the URL has changed from the homepage URL.
9. Verify the new URL contains a search-related path or query parameter (e.g., `/search`, `?q=massage`, or similar).
10. Verify visible content on the results page relates to the search query (page heading, result labels, or listing content mentions "massage").

**Expected outcomes**:
- Submitting the search navigates away from the homepage.
- The destination URL reflects the search query.
- The results page shows content relevant to "massage".

**Success criteria**:
- URL changes after search submission.
- Results page renders with at least one result or a clear "no results" message.
- The search query term is visible somewhere on the results page (in heading, breadcrumb, or results).

**Failure criteria**:
- Pressing Enter or clicking the submit button has no navigation effect.
- The URL does not change.
- The results page is blank or shows an unrelated error.

---

## Scenario 3: Search results page displays a list of matching businesses or services

**Title**: Verify search results page renders business or service listing cards

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Use the search bar to search for "spa".
3. Wait for the results page to load.
4. Locate the list or grid of result items (business cards, service cards, or mixed results).
5. Count the number of visible result items.
6. For the first three visible results, record:
   a. Business or service name.
   b. Location or city (if shown).
   c. Service category label (if shown).
   d. Rating or review count (if shown).
7. Verify that result items have consistent structure across the list.

**Expected outcomes**:
- At least one result item is displayed on the results page.
- Each result item includes at minimum a name.
- Results are plausibly related to "spa" (not completely unrelated services).

**Success criteria**:
- Three or more result items are visible.
- Result items have consistent layout (same structure per card).

**Failure criteria**:
- No results are returned for the broad query "spa".
- Result cards are empty (no text content).
- Results shown are entirely unrelated to the query.

---

## Scenario 4: Search with a location-specific query returns geographically relevant results

**Title**: Verify that including a city name in a search returns results in that city

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Locate the search bar.
3. Type a location-specific query, for example "massage Montreal" or use the service field combined with a location field if the search has two separate inputs.
4. Submit the search.
5. Wait for the results page to load.
6. Examine the visible listing cards for location information.
7. Verify that at least one result card displays "Montreal" or a Montreal neighbourhood as its location.
8. Verify that the results page heading or filter state reflects the location "Montreal".

**Expected outcomes**:
- Results page loads with content.
- At least one result card shows a Montreal location.
- The location context is reflected in the page heading, breadcrumb, or active filter label.

**Success criteria**:
- At least one result card shows "Montreal" (or a recognised Montreal neighbourhood) as its location.
- The URL or visible filter label reflects the Montreal location context.

**Failure criteria**:
- The results page returns zero results for a broad city + service combination.
- All result cards show locations outside Quebec entirely.
- The location context is completely absent from the results page.

---

## Scenario 5: Search autocomplete or suggestions appear while typing

**Title**: Verify that typing in the search bar triggers autocomplete suggestions or a suggestion dropdown

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Click into the search input field.
3. Type "mas" (first three characters of "massage") slowly, one character at a time with a brief pause between characters.
4. After typing "mas", observe whether a dropdown, suggestion list, or autocomplete overlay appears.
5. If a suggestion list appears:
   a. Verify the suggestions are visible and contain text.
   b. Record the first suggestion shown.
   c. Verify at least one suggestion contains the characters "mas" or a word starting with "mas".
   d. Press the Down Arrow key once and verify focus moves to the first suggestion.
   e. Press Escape and verify the suggestion list closes without submitting a search.
6. If no suggestion list appears after typing "mas", type the full word "massage" and observe if suggestions appear.
7. If autocomplete is definitively not implemented, record this as a known gap (not a failure).

**Expected outcomes**:
- A suggestion dropdown appears after typing 2–3 characters (if autocomplete is implemented).
- Suggestions are relevant to the typed text.
- Keyboard navigation (Down Arrow, Escape) works within the suggestion list.
- Pressing Escape closes the suggestion list without navigating away.

**Success criteria**:
- Suggestion list appears and contains at least one item related to the typed query.
- Escape key dismisses the suggestion list.

**Failure criteria**:
- A suggestion list appears but contains no items (empty dropdown).
- A suggestion list appears but does not close when Escape is pressed.
- Clicking a suggestion causes a JavaScript error.

---

## Scenario 6: Clicking an autocomplete suggestion navigates to the correct results

**Title**: Verify selecting a suggestion from the autocomplete dropdown navigates to an appropriate results page

**Starting state**: Fresh browser, no cookies. Autocomplete must be present (established in Scenario 5).

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Click into the search input field.
3. Type "mass" to trigger the autocomplete dropdown.
4. Wait for the suggestion list to appear.
5. Record the text of the first suggestion in the list.
6. Click the first suggestion.
7. Wait for the resulting page to load.
8. Verify the URL has changed from the homepage.
9. Verify the results page content is relevant to the suggestion that was clicked.
10. Verify the search input field (if present on the results page) shows the selected suggestion text or the query it represents.

**Expected outcomes**:
- Clicking a suggestion navigates to a results page.
- The results page is relevant to the selected suggestion.
- The search query context is reflected on the results page.

**Success criteria**:
- URL changes after clicking a suggestion.
- Results page content is related to the suggestion text.

**Failure criteria**:
- Clicking a suggestion has no navigation effect.
- The results page is blank or returns an error.
- The results page content is unrelated to the suggestion selected.

---

## Scenario 7: Searching for a non-existent or nonsense term shows a "no results" message

**Title**: Verify that an unrecognised search query returns a clear "no results" state rather than an error

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en`.
2. Click into the search input field.
3. Type a nonsense string that is unlikely to match any business or service, e.g., "xzqwjfklmxyz123".
4. Submit the search (press Enter or click the search button).
5. Wait for the results page to load.
6. Observe the page for a "no results found" message, empty state illustration, or equivalent user-facing feedback.
7. Verify the page does not show a server error (500), exception trace, or blank white screen.
8. Verify the search input field on the results page (if present) still contains the submitted query.
9. Verify there are no listing cards rendered (zero results displayed).

**Expected outcomes**:
- The results page loads without a server error.
- A "no results" or "no matches" message is shown to the user.
- The page renders a usable UI (header, footer, and search bar still visible).
- Zero listing cards are rendered.

**Success criteria**:
- A user-friendly "no results" message is visible.
- The page structure (header, footer) remains intact.
- No server-side error is exposed to the user.

**Failure criteria**:
- The page returns a 500 error or shows a stack trace.
- The page is blank with no feedback.
- Listing cards are rendered despite no plausible match.
- The search input does not retain the submitted query.

---

## Scenario 8: Search results page allows further filtering by location

**Title**: Verify a location filter on the search results page narrows the displayed results

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and search for "hair salon" (broad query expected to return many results).
2. Wait for the results page to load.
3. Locate a location or city filter control on the results page (dropdown, text input, or list).
4. Record the total number of results shown before filtering (count of visible cards, or a displayed total count if shown).
5. Select or type a specific city in the location filter, e.g., "Quebec City" or "Laval".
6. Submit or apply the filter (may apply automatically on selection, or require a button click).
7. Wait for the results to update.
8. Record the number of results after filtering.
9. Verify the filtered result cards show the selected city as their location.
10. Verify the URL has been updated to reflect the location filter.

**Expected outcomes**:
- A location filter control is present on the search results page.
- Applying a location filter reduces or changes the set of results.
- Filtered result cards display the filtered city as their location.
- The URL reflects the active location filter.

**Success criteria**:
- The result count or result content changes after applying the location filter.
- At least one filtered result card shows the filtered city as its location.
- The URL includes the location filter parameter.

**Failure criteria**:
- No location filter control is present.
- Applying the filter has no effect on the results.
- Results after filtering contain businesses from cities other than the filtered city.

---

## Scenario 9: Search results page allows filtering by service category

**Title**: Verify a service category filter on the search results page narrows results to matching services

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and search for a broad term like "wellness".
2. Wait for the results page to load.
3. Locate a category or service-type filter (may be a dropdown, tag list, or sidebar checkboxes).
4. Record the number of results before filtering.
5. Select one specific category filter option (e.g., "Massage", "Facial", "Nail Care").
6. Wait for the results to update.
7. Record the number of results after filtering.
8. Verify that the visible results are plausibly within the selected category.
9. Deselect or clear the category filter.
10. Verify results return to a broader unfiltered state.

**Expected outcomes**:
- A service category filter is present on the results page.
- Selecting a category changes the displayed results.
- Results after filtering are relevant to the selected category.
- Clearing the filter restores a broader result set.

**Success criteria**:
- Result content changes after applying the category filter.
- At least one filtered result card displays the selected category or a related service type.
- Clearing the filter increases or changes the result set.

**Failure criteria**:
- No category filter is present.
- Selecting a category has no visible effect.
- All results disappear when a valid category is selected, with no "no results" message.

---

## Scenario 10: Search results can be sorted

**Title**: Verify a sort control on the search results page reorders results

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and search for "massage".
2. Wait for the results page to load.
3. Locate a sort control on the results page (dropdown labeled "Sort by", "Order by", or similar).
4. If no explicit sort control exists, note this and end the scenario (not a failure — record as absent).
5. Record the names of the first three visible listings in the default sort order.
6. Change the sort order to a different option (e.g., switch from "Relevance" to "Rating" or from "Rating" to "Distance").
7. Wait for the results to reorder.
8. Record the names of the first three visible listings in the new sort order.
9. Verify at least one of the first three listings differs between the two sort orders, OR verify the URL has changed to reflect the new sort parameter.

**Expected outcomes**:
- A sort control is present (if implemented).
- Changing the sort order updates the URL and/or reorders the listing cards.
- The first three results in the new sort order differ from the first three in the original sort order (or URL updates).

**Success criteria**:
- URL changes to reflect the new sort parameter after changing sort order.
- At least one result card position changes between sort orders.

**Failure criteria**:
- Changing the sort order has no effect on the listing order or the URL.
- The sort control renders but throws a JavaScript error when used.
- The page crashes or returns an error after changing sort order.

---

## Scenario 11: Clicking a search result card navigates to the correct business profile

**Title**: Verify clicking a result card on the search results page opens the correct business profile

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and search for "massage".
2. Wait for the results page to load with at least one result card.
3. Record the business name shown on the first visible result card.
4. Click on the first result card (click the business name link or card body).
5. Wait for the business profile page to load.
6. Verify the URL has changed to a business profile URL.
7. Locate the business name heading on the profile page.
8. Verify the business name on the profile page matches the name recorded in step 3.
9. Navigate back to the search results page using the browser back button.
10. Verify the search results page is still showing the same results (or is restored correctly).

**Expected outcomes**:
- Clicking a result card navigates to a unique business profile URL.
- The business profile page displays the same business name as the result card.
- Browser back navigation returns to the search results page.

**Success criteria**:
- Business name on profile page matches name on result card.
- Back navigation restores the search results page.

**Failure criteria**:
- Clicking the result card does not navigate to a new URL.
- The profile page shows a different business name than the card clicked.
- Back navigation lands on a blank page or an error.

---

## Scenario 12: Search input on the results page accepts a new query and re-searches

**Title**: Verify that a new search can be submitted directly from the search results page

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and search for "massage".
2. Wait for the results page to load.
3. Locate the search input field on the results page (should be pre-populated with "massage" or present as a blank field).
4. Clear the existing query from the search input.
5. Type a new query: "facial".
6. Submit the new query (press Enter or click the search submit button).
7. Wait for the results page to reload or update.
8. Verify the URL now reflects the new query "facial" (not "massage").
9. Verify the results shown are relevant to "facial" and not "massage".
10. Verify the search input field now shows "facial" (or the new query).

**Expected outcomes**:
- A search input field is present on the results page.
- Entering a new query and submitting updates the results.
- The URL reflects the new query term.
- Results are relevant to the new query.

**Success criteria**:
- URL changes from the massage query URL to the facial query URL.
- Result cards are relevant to "facial" after re-searching.
- The search input shows the new query term.

**Failure criteria**:
- The results page has no search input field.
- Submitting a new query does not change the URL or results.
- Results continue to show massage-related content after searching for "facial".

---

## Scenario 13: Search results page URL is shareable and restores the same results

**Title**: Verify that navigating directly to a search results URL renders the same results as performing the search interactively

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and search for "nail salon".
2. Wait for the results page to load.
3. Copy the full URL from the browser address bar.
4. Record the business names of the first three visible result cards.
5. Open a new browser tab (or navigate fresh).
6. Paste the copied URL into the address bar and navigate to it directly.
7. Wait for the page to load.
8. Verify the page title or heading reflects the "nail salon" search context.
9. Record the business names of the first three visible result cards on the directly-navigated page.
10. Compare the business names from step 4 and step 9 — they should match or be in the same set.

**Expected outcomes**:
- Navigating directly to a search results URL renders the same results as performing the search interactively.
- The page heading or filter state reflects the original query.

**Success criteria**:
- At least two of the three recorded business names from step 4 match those from step 9.
- The page heading or search input on the directly-navigated page shows "nail salon".

**Failure criteria**:
- The directly-navigated URL renders a blank page or error.
- The results are entirely different from the interactive search results.
- The search context (query term) is lost on direct navigation.

---

## Scenario 14: Search results page renders correctly on a narrow viewport (mobile simulation)

**Title**: Verify the search results page is usable at a mobile viewport width

**Starting state**: Fresh browser, no cookies. Viewport set to 390px wide × 844px tall (iPhone 14 approximation).

**Steps**:
1. Set the browser viewport to 390px × 844px before navigating.
2. Navigate to `https://www.gorendezvous.com/en`.
3. Wait for the page to fully load.
4. Verify the homepage renders without horizontal overflow (no content clipped or requiring horizontal scroll).
5. Locate the search bar on the homepage at mobile width.
6. Type "massage" in the search bar and submit.
7. Wait for the results page to load.
8. Verify the results page renders without horizontal overflow.
9. Verify result cards are legible at mobile width (text is not overflowing outside card boundaries).
10. Scroll through the results page to verify all major sections are accessible.
11. Locate the navigation — verify it is either a mobile-friendly hamburger menu or a condensed nav, not a full-width desktop nav that overflows.

**Expected outcomes**:
- The homepage and results page render without horizontal scroll at 390px width.
- Search functionality works at mobile viewport.
- Result cards are legible and properly laid out.
- Navigation is adapted to mobile width.

**Success criteria**:
- No horizontal scrollbar is present on either the homepage or results page.
- Result cards display at mobile-appropriate width without text overflow.
- Navigation is accessible (hamburger menu opens or condensed nav is visible).

**Failure criteria**:
- Horizontal scrollbar appears on the results page.
- Result cards overflow their containers and text is clipped.
- The search bar is not reachable at 390px width without horizontal scrolling.
- Navigation is completely hidden with no mobile fallback.

---

## Scenario 15: Search results include a map view or location-based visual context (if available)

**Title**: Verify that search results offer a map view or geographical display option, and that it renders without error

**Starting state**: Fresh browser, no cookies.

**Steps**:
1. Navigate to `https://www.gorendezvous.com/en` and search for "massage Montreal".
2. Wait for the results page to load.
3. Look for a map toggle, "Map view" button, or an embedded map panel alongside the listing results.
4. If a map view toggle is present:
   a. Click the map view toggle or button.
   b. Wait for the map to render.
   c. Verify the map renders (no broken iframe, no error tile, no "Map could not be loaded" message).
   d. Verify the map displays markers or pins corresponding to search results.
   e. Click one map marker/pin.
   f. Verify a tooltip, popup, or sidebar update shows a business name related to the search results.
   g. Toggle back to list view (click "List view" or equivalent).
   h. Verify the list of result cards is restored.
5. If no map view is present, record this as a known absence (not a failure — note it for coverage tracking).

**Expected outcomes**:
- If a map view is implemented: it renders correctly with business pins visible.
- Clicking a map pin shows business name or summary information.
- Switching between map and list view works without errors.

**Success criteria**:
- Map renders without broken tiles or error messages.
- At least one map pin is clickable and shows a business name.
- List view is restored after toggling back from map view.

**Failure criteria**:
- Map view toggle is present but clicking it shows a broken or blank map.
- Map renders but no pins are shown for a query that returns multiple results.
- Clicking a map pin throws a JavaScript error or crashes the page.
- Toggling back to list view loses all results or returns a blank page.
