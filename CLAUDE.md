# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation standards

- **Headings**: Use sentence case (e.g., `## Project setup instructions`).
- **Bullet Points**: Use hyphens (`-`). Nested bullets require a 2-space indentation.
- **Line Length**: Do not wrap lines automatically; let them exceed 80 characters if needed.
- **Code Blocks**: Always specify the language (e.g., ```python) and avoid unformatted text.
- **Tables**: Ensure every table has a header and aligned columns using `| --- |`.
- **Glossary**: Bold key terms on their first use within any documentation file.
- **Tone**: Professional, concise, and focused on step-by-step actions.

## What this is

**Muon** is an experimental, **token-based** Web Component pattern library for building Design Systems, built on **[Lit](https://lit.dev) 3**. Unlike most component libraries it ships **tokens**, not opinionated styles — consumers theme components by overriding design tokens rather than writing CSS. The published package is `@muonic/muon` (in [packages/muon/](packages/muon/)). This is an **npm workspaces** monorepo; the root is `@muonic/root`.

## Commands

Run from the repo root unless noted. **Dependencies must be installed at the root** (npm workspaces) — do not `npm install` inside `packages/muon`.

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Dev (Storybook on :8000) | `npm run dev` |
| Build Storybook static site | `npm run build` |
| Run component tests | `npm test` |
| Watch tests | `npm run test:watch` |
| Update test snapshots | `npm run test:snapshots` |
| Test build/token scripts (ava) | `npm run test:scripts` |
| Lint everything | `npm run lint` |
| Lint/fix JS | `npm run lint:js` / `npm run lint:js:fix` |
| Lint/fix CSS | `npm run lint:css` / `npm run lint:css:fix` |
| Docs site (local) | `npm run docs:dev` |

**Running a single test file** — `@web/test-runner` is the runner. From [packages/muon/](packages/muon/):

```bash
npx web-test-runner "tests/components/cta/cta.test.js"
```

Tests run in real browsers (chromium, firefox, webkit via Playwright) and enforce a **99% coverage threshold** ([packages/muon/web-test-runner.config.mjs](packages/muon/web-test-runner.config.mjs)). Component/mixin tests live in [packages/muon/tests/](packages/muon/tests/) and use `@open-wc/testing`; script/util tests use **ava**.

Node `>=22` is required. Commits follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, etc.) — enforced by commitlint via husky. Branches: `feature/*`, `epic/*`, `hotfix/*`.

## Architecture

### The `@muonic/muon` barrel — never import Lit directly

[packages/muon/index.js](packages/muon/index.js) re-exports everything from Lit (`html`, `css`, `LitElement`, directives, `staticHTML`, `ScopedElementsMixin`, etc.) plus `MuonElement`. **Components and tests import these from `@muonic/muon`, not from `lit` directly.** This keeps the Lit dependency surface centralized.

### `MuonElement` and the type-based template system

All components extend **`MuonElement`** ([packages/muon/muon-element/index.js](packages/muon/muon-element/index.js)), itself `MuonElementMixin(LitElement)`. Two things to know:

- **`render()` dispatches on the `type` property.** It renders `this[`${this.type}Template`]` — e.g. `type="standard"` renders the `standardTemplate` getter, `type="submit"` renders `submitTemplate`. Components define these as getters returning Lit templates (see [cta-component.js](packages/muon/components/cta/src/cta-component.js)). The default `type` comes from the component's `config-tokens.json`.
- **Light-DOM style injection.** `__addLightDOM()` injects a component's `slottedStyles` into the parent document/shadow root. Styles authored with the `light-dom` selector keyword get rewritten to the element's tag name. These come from `*.slotted.css` files (see [inputter-styles.slotted.css](packages/muon/components/inputter/src/inputter-styles.slotted.css)).

Scoped child elements use `ScopedElementsMixin` with a static `scopedElements` map (e.g. CTA scopes `Icon` as `cta-icon`).

### Component file layout

Each component in [packages/muon/components/](packages/muon/components/) follows:

```text
<name>/
  index.js                     # re-exports the component class
  story.js                     # Storybook stories
  src/
    <name>-component.js         # the LitElement class
    <name>-styles.css           # shadow-DOM CSS (uses $TOKEN vars)
    <name>-styles.slotted.css   # optional light-DOM styles
    design-tokens.json          # themeable tokens (CSS custom props)
    config-tokens.json          # default values for component properties
```

Shared behaviour lives in [packages/muon/mixins/](packages/muon/mixins/) (e.g. `form-element-mixin`, `validation-mixin`, `card-mixin`).

### The `@muon/*` import aliases

Inside the library, components import siblings via `@muon/*` aliases, resolved by `getAliasPaths()` in [packages/muon/scripts/utils/index.mjs](packages/muon/scripts/utils/index.mjs):

| Alias | Resolves to |
| --- | --- |
| `@muon/components/*` | `@muonic/muon/components/*` |
| `@muon/mixins/*` | `@muonic/muon/mixins/*` |
| `@muon/directives/*` | `@muonic/muon/directives/*` |
| `@muon/utils/*` | `@muonic/muon/utils/*` |
| `@muon/tokens` | the generated `build/tokens/es6/muon-tokens` |

Consumer apps can add their own aliases via `muon.config.json`. Aliasing is applied at build/serve time through `@rollup/plugin-alias` in [packages/muon/scripts/rollup-plugins.mjs](packages/muon/scripts/rollup-plugins.mjs).

### Token pipeline (Style Dictionary + PostCSS)

This is the heart of the theming system and spans several files:

1. **Source tokens** live in [packages/muon/tokens/theme/](packages/muon/tokens/theme/) (`color`, `font`, `size`, `spacer`) plus each component's `design-tokens.json`. Component tokens reference theme tokens, e.g. `"value": "{theme.color.primary}"`.
2. **Style Dictionary** ([packages/muon/scripts/style-dictionary.mjs](packages/muon/scripts/style-dictionary.mjs) + `createTokens()` in scripts/utils) compiles all tokens into `packages/muon/build/tokens/` in three formats: `css`, `es6` (`muon-tokens.mjs`), and `json`. Custom transforms/formats live in [packages/muon/tokens/utils/](packages/muon/tokens/utils/).
3. **CSS authoring** uses `$UPPER_SNAKE_CASE` variables (e.g. `$CTA_GAP`, `$CTA_BACKGROUND_COLOR`). `postcss-simple-vars` substitutes these from the generated es6 tokens at build time; unknown tokens are stripped. The build runs the full **PostCSS** chain (import, preset-env stage 0, extend-rule, autoprefixer, cssnano) — all configured in `serverPlugins`/`rollupPlugins` in [packages/muon/scripts/rollup-plugins.mjs](packages/muon/scripts/rollup-plugins.mjs).

When you change a token, the value flows: `design-tokens.json` → Style Dictionary → generated tokens → `$VAR` substitution in `*-styles.css`.

### Configurable element prefix

Custom element tag names are `<prefix>-<name>` (default prefix `muon`, so `muon-cta`). The prefix is configurable via `muon.config.json` (`components.prefix`) and is injected two ways at build time:

- `process.env.MUON_PREFIX` is replaced by `@rollup/plugin-replace`.
- CSS selectors written as `PREFIX-...` are rewritten to `<prefix>-...` by the `modify-selectors` PostCSS plugin.

### Custom elements manifest

`sourceFilesAnalyzer()` (scripts/utils) uses `web-component-analyzer` over the component source to generate `custom-elements.json` and to enforce that no two components share a tag name. Component metadata (the `@element <name>` JSDoc tag) drives the generated tag name.

### `muon.config.json`

Controls which components are included (`components.included`, default `"all"`), the prefix, token directories/theme, and custom aliases. `getConfig()` looks for it in the consuming project's cwd first, then the app root.

## Conventions

- JSDoc is **required and linted** (`valid-jsdoc`/`eslint-plugin-jsdoc`) — getters and methods carry `@returns`/`@param` and `@protected`/`@private` visibility tags. `eqeqeq`, `consistent-return`, and `default-case` are errors.
- Component CSS imports the shared base via `@import "@muonic/muon/css/default.css";`.
- Stories use the `setup(name, Class)` helper from [packages/muon/storybook/stories.js](packages/muon/storybook/stories.js), which defines the custom element and builds static-HTML templates with `staticHTML`.
