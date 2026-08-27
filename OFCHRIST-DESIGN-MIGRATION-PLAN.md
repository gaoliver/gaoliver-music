# Of Christ design migration implementation plan

This plan turns `OFCHRIST-DESIGN-MIGRATION-REPORT.md` into small, verifiable, independently committed steps. The report remains the visual and architectural source of truth. If this plan and the report ever disagree, follow the report.

## Non-negotiable rules for every implementation agent

1. Read the complete migration report and this plan before editing.
2. Keep all public content in JSON files under `src/data/`. Do not add Notion, Contentful, a CMS SDK, runtime content fetching, or CMS-specific types.
3. Treat `Hero`, `Releases`, and `ReleaseCard` as protected UI. Preserve their composition, content hierarchy, CTA behavior, responsive behavior, gradients, artwork placement, streaming actions, and hover treatment. Refactors are allowed only after tests protect the behavior.
4. Preserve the Getform contact provider and move the full form experience to `/contact`. A homepage contact preview may link to that page but must not duplicate the form.
5. Publish only pages backed by real content. Do not invent shows, articles, lyrics, history, dates, credits, videos, or biographies.
6. Keep React. Do not copy Angular, NgRx, browser-global event handlers, direct class mutation, or runtime Contentful patterns from the reference project.
7. Use semantic HTML, one `h1` per route, keyboard-accessible navigation, visible focus, reduced-motion fallbacks, descriptive link labels, and explicit empty/error states.
8. Every step ends with lint, relevant tests, a production build, and a focused manual or browser verification. Fix regressions before committing.
9. Commit only files belonging to the current step. Use the commit title listed for that step. Never squash unrelated user work into a migration commit.

## Step 0 — Baseline and protected-component safety net

Goal: create evidence that the existing music UI still behaves correctly before redesigning its surroundings.

Files and actions:

- Add Vitest, Testing Library, jsdom, and Playwright configuration with the smallest maintainable setup.
- Add component tests for `Hero`, `Releases`, and both `ReleaseCard` variants.
- Cover a featured release, an absent featured release, missing optional streaming links, and a long title.
- Replace the homepage non-null assertion with a safe rendering branch while preserving the normal visual output.
- Fix the unused contact-form catch binding without changing form behavior.
- Add scripts for unit tests and browser tests.
- Record the production bundle sizes in a small baseline document.

Acceptance checks:

- `npm run lint` passes.
- Unit tests pass.
- The production build passes.
- Hero and release cards render at desktop and mobile widths without console errors.
- Removing the featured flag from fixture data does not crash the homepage.

Commit: `test: protect existing music components`

Agent prompt:

```text
Read OFCHRIST-DESIGN-MIGRATION-REPORT.md and OFCHRIST-DESIGN-MIGRATION-PLAN.md completely. Work only on Step 0. Add the smallest practical Vitest/Testing Library and Playwright safety net for Hero, Releases, and ReleaseCard. Test featured and regular cards, absent featured data, missing streaming links, and long titles. Fix the existing lint error and remove the unsafe homepage featured-release assertion with a visually neutral empty behavior. Do not redesign anything. Run lint, unit tests, browser tests where the environment supports them, and the production build. Do not commit; report every changed file and command to the integrator.
```

## Step 1 — Shell tokens and background media

Goal: introduce the reference design language without recoloring protected music UI.

Files and actions:

- Add all `--shell-*` and all protected `--music-*` variables from the report.
- Preserve compatibility aliases used by existing Tailwind classes.
- Add `BackgroundMedia` with image, optional video, poster, stable contrast overlay, `muted`, `autoPlay`, `loop`, `playsInline`, and `preload="metadata"`.
- Respect `prefers-reduced-motion` by never starting decorative video for those users.
- Keep the current homepage artwork as the fallback visual. Do not add invented or oversized media.
- Ensure media is decorative and cannot steal focus or pointer interaction.

Acceptance checks:

- Existing protected screenshots remain equivalent.
- Image-only fallback always renders.
- Reduced-motion mode displays the poster/image and no autoplaying video.
- No global selector leaks shell colors into protected cards.

Commit: `feat: add cinematic shell foundations`

Agent prompt:

```text
Read the migration report, the plan, and the Step 0 regression tests. Work only on Step 1. Add the exact shell and protected-music tokens described by the report, maintaining existing Tailwind aliases. Build a reusable accessible decorative BackgroundMedia component that supports image, video, poster, overlay, playsInline, metadata preload, responsive cover behavior, reduced-motion suppression, and safe fallback when video cannot play. Do not add final media, redesign protected components, or modify routes. Add focused tests and verify lint, tests, build, desktop, mobile, and reduced-motion behavior. Do not commit; report changed files and evidence.
```

## Step 2 — Reference header, navigation, mobile menu, and footer

Goal: make the global chrome visually match the Of Christ shell while remaining data-driven and accessible.

Files and actions:

- Rebuild the desktop header with a transparent/sticky shell, a roughly 190px logo, uppercase links, and a 1280px content width.
- Support optional image-backed submenu data, but render no empty submenu.
- Make desktop submenus work through pointer and keyboard focus.
- Replace the side drawer with a full-screen red mobile menu.
- Trap focus in the open mobile menu, close it with Escape, restore focus to the trigger, and lock body scroll.
- Use real links for route navigation; never use button-only pseudo-links.
- Rework the footer into compact centred streaming/social groups and subdued uppercase copyright.
- Keep navigation in `src/data/site.json`, listing only routes that exist at that commit.

Acceptance checks:

- Header/footer appear consistently on every published route.
- Tab, Shift+Tab, Escape, and focus restoration work.
- Menu state exposes correct `aria-expanded` and `aria-controls`.
- External links have safe target/rel behavior.
- Layout works at 320, 390, 768, 1024, and 1440px.

Commit: `feat: migrate global navigation shell`

Agent prompt:

```text
Read both migration documents and inspect the current Header, NavMenu, MobileDrawer, HamburgerButton, Footer, SocialLinks, Logo, Button, and site JSON. Work only on Step 2. Implement the Of Christ transparent desktop header, uppercase navigation, optional accessible image submenu model, full-screen red mobile menu, and compact centred footer. Use semantic links and React state. Implement focus trap/restoration, Escape close, accurate ARIA, body scroll locking, keyboard submenu operation, reduced-motion transitions, and external-link safety. Keep navigation data-driven and do not publish unavailable routes. Do not touch protected Hero/Releases/ReleaseCard markup or styles. Verify all specified widths, keyboard flow, lint, tests, and build. Do not commit; report exact files and risks.
```

## Step 3 — Editorial design primitives

Goal: create the reusable page visual language before building pages.

Files and actions:

- Add `PageTitle`, `PageContentSurface`, `PageSection`, `FeaturedTile`, `FeaturedTileGrid`, and `Timeline`.
- Match the report's oversized uppercase page title, vertical pause, black content plane, and deep top fade.
- Use flexible `clamp()`/viewport-aware geometry so small screens never clip.
- Implement dim-siblings and scale-focused-tile interaction for fine pointers only.
- Give hover and focus equivalent emphasis; disable decorative motion for reduced motion.
- Keep Timeline unpublished until real timeline JSON exists.

Acceptance checks:

- Primitives are semantic, responsive, and isolated from protected music styling.
- No fake public pages or fictional content are introduced.
- Components remain readable at all required widths.

Commit: `feat: add editorial page primitives`

Agent prompt:

```text
Read the migration report and plan. Work only on Step 3. Create PageTitle, PageContentSurface, PageSection, FeaturedTile, FeaturedTileGrid, and Timeline components using shell tokens and semantic HTML. Match the documented geometry: 5rem desktop and 3.5rem mobile titles, deliberate page-title-to-content spacing, opaque black surface, and deep top fade. Use clamp/min/max rather than brittle fixed heights. Add focus-visible parity, fine-pointer-only hover effects, touch-safe behavior, and reduced-motion alternatives. Create tests/examples without publishing fictional routes. Do not alter protected components. Verify lint, tests, build, and required breakpoints. Do not commit.
```

## Step 4 — Canonical JSON content boundary and real routes

Goal: establish typed, validated route content while honoring the JSON-only content decision.

Files and actions:

- Create canonical domain types for navigation, social links, streaming links, releases, page content, SEO, and contact data.
- Add runtime validation for every imported JSON document with errors that identify the file and record.
- Keep the JSON files in `src/data/`; schemas/types belong in normal TypeScript modules.
- Add `/`, `/about`, `/releases`, and `/contact` only.
- Keep the protected homepage hero and release composition.
- Move the existing contact form to `/contact`; replace the homepage form with a concise contact preview/link.
- Add a route-aware link helper so hash targets work from both the homepage and internal pages.
- Add route-level not-found/empty handling.

Acceptance checks:

- Invalid JSON content fails explicitly during tests/build.
- Direct navigation and refresh work in the current static-hosting mode.
- `/contact` contains the same provider, fields, messages, and submission behavior.
- No unpublished route is in navigation or sitemap.

Commit: `feat: add validated content routes`

Agent prompt:

```text
Read both migration documents and all current JSON. Work only on Step 4. Keep the content source strictly as JSON in src/data. Add canonical reusable TypeScript domain types and runtime/build validation with precise file-and-record errors. Create real routes for /, /about, /releases, and /contact using only existing content. Preserve the homepage Hero and Releases output. Move the existing full Getform contact form to /contact and replace the homepage form with a short route link. Unify internal routes and home hash links, add safe empty/not-found behavior, and publish no other route. Do not add a global store, CMS, or invented content. Verify validation failures, navigation, direct refresh behavior, lint, tests, and build. Do not commit.
```

## Step 5 — Static pre-rendering architecture

Goal: produce independent HTML and metadata for every published route while keeping GitHub Pages.

Files and actions:

- Follow current official React Router Framework Mode adoption documentation.
- Align React, React DOM, router, Vite, and Node versions to a mutually supported set.
- Use route modules and `ssr: false` static pre-rendering for `/`, `/about`, `/releases`, `/contact`, and known release slugs.
- Generate the actual framework client output expected by GitHub Pages.
- Update CI to Node 24 (or the exact supported version documented in package engines).
- Preserve custom-domain `/` base, CNAME, asset URLs, and a useful 404 fallback.
- Document a rollback to the preceding declarative-router commit.

Acceptance checks:

- Every published route has generated HTML with unique metadata.
- A local static server can open and refresh every route directly.
- GitHub Pages workflow uploads the correct output directory.
- Protected regression tests still pass.

Commit: `refactor: adopt static route pre-rendering`

Agent prompt:

```text
Read the migration report and plan, then consult the current official React Router Framework Adoption from Component Routes and Pre-Rendering documentation. Work only on Step 5. Inspect current versions before editing. Adopt Framework Mode incrementally, disable runtime SSR, pre-render every published route and known dynamic slug, and preserve custom-domain GitHub Pages hosting. Align CI and package Node requirements. Update build/output/fallback handling and write a short rollback note. Avoid component markup or CSS changes unless strictly required by framework boundaries. Verify generated HTML, unique route metadata, client navigation, direct refresh through a local static server, lint, tests, production build, and protected screenshots. Do not commit.
```

## Step 6 — Release index, release details, and canonical SEO

Goal: turn the existing catalog into shareable, crawlable pages without inventing facts.

Files and actions:

- Reuse the existing `Releases` and `ReleaseCard`; do not create replacement cards.
- Extend release JSON only with factual values already present or supplied.
- Add `/releases/:slug` for each current release.
- Replace the tracked Spotify authorization URL with the existing stable smart link when no verified canonical Spotify URL exists.
- Derive title, description, canonical, Open Graph/Twitter, and MusicAlbum/MusicRecording JSON-LD from the same validated release object.
- Generate sitemap entries from the route/content registry.

Acceptance checks:

- All release slugs pre-render.
- Invalid slug, missing art, missing platform, and long title are safe.
- Metadata and JSON-LD never duplicate manually maintained release facts.
- Streaming links are stable and intentional.

Commit: `feat: add release detail pages and metadata`

Agent prompt:

```text
Read the migration report, plan, protected component tests, and validated release model. Work only on Step 6. Build the release index and one pre-rendered detail path per real JSON release. Reuse Releases and ReleaseCard. Do not invent tracks, credits, dates, lyrics, or media. Replace transient tracking/client URLs only with an existing verified smart link. Derive metadata, canonical URL, social data, sitemap records, and MusicAlbum/MusicRecording JSON-LD from the canonical release record. Handle missing art/platform, long titles, and invalid slugs. Verify every generated path, accessibility, metadata, structured data, lint, tests, and build. Do not commit.
```

## Step 7 — Optional editorial routes, only when data exists

Goal: make future expansion safe without publishing empty promises.

Files and actions:

- Add Shows, News, News detail, Videos, Lyrics, Song detail, Story, or Timeline only after corresponding real JSON exists.
- Use the shared page primitives and validated content repository.
- Valid empty collections may show explicit empty states such as “No upcoming shows”.
- Exclude absent/unpublished content from navigation, pre-render paths, sitemap, and structured data.

Acceptance checks:

- No fictional Of Christ content is copied.
- Every public route has real content and metadata.
- Empty-state routes are deliberate and tested.

Commit, only if applicable: `feat: add supplied editorial content routes`

Agent prompt:

```text
Read the migration report, plan, and every JSON file under src/data. Work only on Step 7. Inventory which editorial domains have real supplied data. Add routes only for those domains; otherwise make no public route and clearly report the missing content. Use shared primitives and validation. Never copy Of Christ facts or invent G.A. Oliver content. Exclude absent routes from navigation, pre-render configuration, sitemap, and JSON-LD. Verify all published paths, empty states, metadata, internal links, accessibility, lint, tests, and build. Do not commit.
```

## Step 8 — Contact, performance, accessibility, and SEO hardening

Goal: finish the migration with resilient interactions and measurable quality.

Files and actions:

- Keep Getform, adding AbortController timeout, a hidden honeypot, accessible live status, correct disabled states, and safe timer cleanup.
- Add route-specific metadata, canonical URLs, absolute social images, robots rules, generated sitemap, and canonical JSON-LD.
- Reserve image dimensions, lazy-load noncritical images, and keep decorative background media below the documented budget.
- Add accessible 404 handling and a broken-internal-link check.
- Audit keyboard operation, focus, headings, labels, contrast, alt text, reduced motion, and external links.
- Measure initial JavaScript gzip size and document any exception over 120 kB.

Acceptance checks:

- Contact form exposes idle, sending, success, timeout, and error states in an `aria-live` region.
- Full lint/test/build suite passes.
- All public routes have unique rendered metadata and valid internal links.
- No secret or management credential appears in the client bundle.
- Final desktop/mobile screenshots show no clipping at required widths.

Commit: `chore: harden accessibility performance and seo`

Agent prompt:

```text
Read the migration report and plan. Work only on Step 8. Preserve Getform while adding timeout/abort handling, honeypot spam protection, accessible live status, correct sending/disabled behavior, timeout-specific copy, and timer cleanup. Complete route metadata, canonical/Open Graph/Twitter tags, absolute social images, robots, sitemap, JSON-LD consistency, 404 handling, internal-link checks, responsive image dimensions/loading, reduced motion, and bundle budget reporting. Audit keyboard focus, heading order, labels, contrast, alt text, menus, and external links at 320, 390, 768, 1024, and 1440px. Run the complete verification suite and report any documented exception. Do not commit.
```

## Commit and verification protocol

For every step:

1. Confirm the worktree contains no unrelated modifications before staging.
2. Review the complete diff for scope, accidental content changes, secrets, generated bulk, and protected-component changes.
3. Run `npm run lint`, the relevant focused tests, the full test suite, and `npm run build`.
4. Serve the production output and manually verify the affected routes and breakpoints.
5. Refactor duplication or confusing naming found during review.
6. Re-run the same checks after refactoring.
7. Stage only files belonging to the step.
8. Create the exact step commit.
9. Record the commit hash and verification evidence before starting the next step.

## Definition of complete

The migration is complete when all applicable steps pass, the four content-backed routes and all current release detail paths are statically generated, the protected music UI remains visually equivalent, the Contact page owns the preserved and hardened form, content stays JSON-backed under `src/data`, unpublished content domains remain absent, and the production build is ready for the existing custom-domain GitHub Pages workflow.
