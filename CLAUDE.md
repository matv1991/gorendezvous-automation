# Project conventions

## Playwright Agents

Always refer to the agent definitions before acting on any
test-related task:

- Planning: read .claude/agents/playwright-test-planner.md
- Generating: read .claude/agents/playwright-test-generator.md
- Healing: read .claude/agents/playwright-test-healer.md

## Test plans

Scenarios are stored as individual files in specs/, one per flow,
named plan-[flow-name].md:

When adding new scenarios, append to the relevant flow file.
When adding a new flow, create a new specs/plan-[flow-name].md file.

## Rules

- Never delete test files or remove test cases without
  explicit permission
- Always import from fixtures/index.ts instead of
  @playwright/test directly
- One test file per test case in tests/[flow-name]/
- Page objects live in pages/
- Commit before modifying existing files
- Workers capped at 3 in playwright.config.ts — do not change
- When healing, always read error context files in test-results/ to diagnose failures before making changes
- NEVER automate bookings, account creation, or any action that submits real data to the site
