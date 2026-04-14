# gorendezvous-automation

End-to-end test automation suite for [gorendezvous.com](https://www.gorendezvous.com/en) built with Playwright and TypeScript.

## About this project

This project was built to demonstrate QA automation practices including:

- **Page Object Model** — UI interactions abstracted into reusable page classes
- **Agent-driven workflow** — three specialised Claude Code agents handle planning, generation, and healing
- **Severity-tagged tests** — `@critical`, `@high`, `@medium`, `@low` for targeted test runs
- **Structured test plans** — every test scenario documented in `specs/` before code is written

## Tech stack

- [Playwright](https://playwright.dev/) — browser automation and test runner
- TypeScript — type-safe test code
- Claude Code agents — AI-assisted test planning, generation, and maintenance

## Project structure

```
.claude/agents/        # Planner, generator, healer agent definitions
fixtures/              # Custom test fixture (ad blocking)
pages/                 # Page Object Model classes
specs/                 # Test plan markdown files, one per flow
tests/                 # Test files, one per test case
  browse/
  search/
  ...
playwright.config.ts   # Playwright configuration
CLAUDE.md              # Project conventions for Claude Code
```

## Running tests

```bash
# Install dependencies
npm install

# Install browser
npx playwright install chromium

# Run all tests
npx playwright test

# Run only critical tests (pre-deploy gate)
npx playwright test --grep "@critical"

# Run a specific flow
npx playwright test tests/browse/

# Open HTML report
npx playwright show-report
```

## Scope

Tests cover **read-only** user flows only — browsing, searching, and viewing service listings. No bookings, account creation, or form submissions are automated out of respect for the live production site.

## Agent workflow

| Task | Command |
|---|---|
| Plan a new flow | `/planner` in Claude Code |
| Generate tests from plan | `/generator` in Claude Code |
| Fix failing tests | `/healer` in Claude Code |
