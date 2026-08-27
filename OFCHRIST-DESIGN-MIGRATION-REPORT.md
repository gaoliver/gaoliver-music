# Of Christ design migration report

**Project:** G.A. Oliver music website

**Reference:** [live Of Christ website](https://gabrielramos.app/ofchrist-website/) and [source repository](https://github.com/gaoliver/ofchrist-website)

**Assessment date:** 2026-08-27

**Status:** Proposed implementation blueprint

## Executive decision

Reuse the Of Christ **visual system and information architecture**, not its Angular implementation.

The target should remain React and Vite, then move deliberately from the current one-route declarative SPA to React Router Framework Mode with static pre-rendering. This preserves the components that already work, keeps GitHub Pages viable, improves per-route SEO, and creates a clean path for pages such as About, Shows, News, Music, Lyrics, Videos, and Contact.

The following existing UI is protected:

- `src/components/organisms/Hero/Hero.tsx`: preserve its two-column composition, content hierarchy, CTA behavior, responsive behavior, gradients, and featured-release placement.
- `src/components/molecules/ReleaseCard/ReleaseCard.tsx`: preserve both the featured and regular visual variants, square artwork, metadata, streaming actions, and existing hover treatment.
- `src/components/organisms/Releases/Releases.tsx`: preserve the card grid and its current content contract.

“Preserve” means no visual redesign, API break, or unrequested brand recolor during the migration. Internal duplication may be refactored only after visual regression coverage proves equivalent output.

## What was analysed

The audit covered:

- the rendered reference site at desktop and mobile breakpoints;
- the full public repository tree and the reference site's routing, styles, components, Contentful services, NgRx state, SEO utilities, and build configuration;
- the current repository's build configuration, data files, atomic component structure, deployment workflow, homepage, header, mobile navigation, form, SEO, hero, and release cards;
- a local production build and live desktop/mobile rendering of the current project.

The reference is a 2023 Angular application. Its GitHub repository was last pushed on 2023-07-09. The current project is a smaller React application with substantially less runtime and architectural overhead.

## 1. Reference website: technology and architecture

### Technology inventory

| Area | Reference implementation |
|---|---|
| UI framework | Angular 16.1, TypeScript 5.1, Zone.js |
| Component UI | Angular Material/CDK, custom SCSS |
| Routing | Angular Router with static and parameterized routes |
| State | NgRx Store; Effects is installed but not meaningfully used in the inspected flow |
| Content | Contentful Delivery SDK, content types for home, SEO, about, video, timeline, album, song, news, ads, and shows |
| Rich text | Contentful rich-text renderer, then HTML insertion |
| Video | Angular YouTube Player plus a full-viewport background video |
| Icons | Locally registered SVG icons through Angular Material's icon registry |
| Deployment | Angular build plus `angular-cli-ghpages` for GitHub Pages |
| Testing | Jasmine/Karma component specs generated for most components |

### Information architecture

The reference is a real multi-route band site, not just a long landing page.

```text
/
├── shows
├── news
│   └── :slug
├── a-banda
│   ├── nossa-historia
│   └── linha-do-tempo
├── musicas
│   ├── letras
│   │   └── :songId
│   ├── videos
│   ├── discografia
│   └── album/:albumId
└── contato
```

This is one of the most valuable ideas to carry over. It allows every important topic or release to have a durable URL, focused metadata, and a page that can be shared independently.

### Reference visual system

The design is built from a small, consistent vocabulary:

| Token or rule | Reference value/behavior |
|---|---|
| Page background | `#0a0a0a` |
| Primary text | `#fdfdfd` |
| Muted text | `#7e848c` |
| Light muted text | `#d7d7d7` |
| Primary accent | `#ad0e10` |
| Hover accent | `#ef090c` |
| Base spacing unit | `10px` |
| Content width | `1280px` |
| Main typeface | Roboto / Helvetica Neue / sans-serif |
| Headings | Uppercase, compact line-height, very large page titles |
| Breakpoints | 600px, 768px, and 1023px |

The desktop home page is a full-viewport cinematic canvas. A muted looping performance video is positioned behind the entire page, darkened with contrast, grayscale, and opacity. The logo sits at the upper left; uppercase navigation sits at the upper right; social/streaming icons and copyright sit low and centred. There is almost no decorative chrome. The visual weight comes from media, black negative space, typography, and subtle red interaction states.

Content pages use a particularly reusable pattern:

1. a very large uppercase title over the fixed page background;
2. a long visual pause below the title;
3. an opaque black content surface rising over the background;
4. a large soft black shadow that makes the surface blend into the media;
5. editorial tiles made from full-bleed imagery, bottom gradients, and overlaid text.

The page-title implementation is `5rem` on desktop and `3.5rem` on mobile. The main content surface begins roughly `40svh` below it on desktop and about `100px` below it on tablet/mobile.

### Navigation behavior

- Desktop header: transparent/sticky shell, 1280px content width, 190px logo, uppercase links.
- Desktop submenus: large full-width image-backed panels that slide down from behind the header.
- Header hover: red highlight with a short rotate/scale movement.
- Mobile menu: full-screen red panel, large centred navigation, close control, and social icons at the bottom.
- Footer: compact, uppercase, subdued gray icons/text; social and streaming platforms are treated as separate groups.

### Reusable component ideas

The most transferable patterns are:

- `PageTitle`: route-aware, oversized title over background media.
- `PageContentSurface`: black content plane with the deep top fade/shadow.
- `PageSection`: heading plus optional right-aligned “view all” link.
- `FeaturedTile`: full-bleed image, gradient overlay, date/title/description.
- `FeaturedTileGrid`: surrounding tiles dim while the hovered tile scales slightly.
- `BackgroundMedia`: responsive image/video/poster selection with an overlay.
- `StreamingLinks`: platform-aware actions with consistent icons and accessible labels.
- `BandTimeline`: year-grouped editorial timeline.
- `ReleaseDetail` and `SongDetail`: artwork/media beside structured metadata and lyrics.

### What should not be copied

The Angular code is useful as design evidence, but it should not be treated as a technical template.

- A single eager root Angular module declares every page and component; there is no route-level lazy loading.
- NgRx is disproportionate for mostly static CMS content, and several flows call Contentful directly before dispatching completed data.
- `getEntries(...).items[0]` is used repeatedly without empty-state handling.
- Async operations have little error handling or user-facing failure recovery.
- Several subscriptions are never disposed.
- Global `document.onscroll`, `onresize`, and direct class manipulation bypass framework state.
- Mobile detection uses `window.screen.width`; CSS media queries or `matchMedia` are more reliable.
- The YouTube iframe API is added globally on every application start, whether a route needs it or not.
- Relative plain anchors are mixed with router links and a deployment base URL.
- The Contentful content model is cast through `unknown`; the network boundary is not runtime validated.
- The repository contains an 8.7 MB background PNG and an 18.5 MB MP4. These are unacceptable defaults for the new site's critical path.
- The initial Angular budget permits an error threshold of 500 MB, making the budget ineffective.
- The design sometimes hides information on mobile rather than adapting it.

The implementation should reproduce the **appearance and behavior** while correcting these weaknesses.

## 2. Current project: technology and architecture

### Technology inventory

| Area | Current implementation |
|---|---|
| UI framework | React 19.1 with TypeScript 5.9 |
| Build | Vite 7.1 |
| Styling | Tailwind CSS 3.4, PostCSS, a few CSS variables/utilities |
| Routing | React Router DOM 7.9 in declarative mode, with only `/` |
| Content | Local JSON files grouped by domain |
| Icons | React Icons |
| Form | Browser fetch to a configured Getform endpoint |
| Deployment | GitHub Actions to GitHub Pages; custom domain and `base: '/'` |
| Tests | No test runner or test script |

### Current structure

The project follows Atomic Design:

```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── templates/
├── pages/
├── data/
├── types/
└── utils/
```

This is clear for a one-page site. As the number of routes grows, page/domain ownership should become more explicit; otherwise generic Atomic Design folders become long mixed catalogs.

### Current strengths

- The homepage is compact and easy to reason about.
- The hero and release cards already form a strong visual centre.
- Static JSON makes deployment deterministic and avoids runtime CMS failure.
- Shared `CTA`, social link, navigation, and release concepts are already present.
- External links generally receive `target="_blank"` and `rel="noopener noreferrer"`.
- The mobile drawer includes body-scroll locking.
- The current production build succeeds and is small: 18.73 kB CSS (4.40 kB gzip) and 258.25 kB JavaScript (84.22 kB gzip).
- The GitHub Pages workflow and custom-domain Vite base are fundamentally appropriate.

### Current gaps and risks

1. **No route-level content or SEO.** Every topic is part of `/`, and the static `index.html` owns all metadata.
2. **Content is typed by convention, not validated.** JSON imports do not prove the runtime/content shape, and equivalent interfaces are repeated in components.
3. **Unsafe featured-release assumption.** `featuredRelease!` makes a missing featured item a runtime failure.
4. **Duplicated card rendering.** `ReleaseCard` repeats nearly all streaming-button markup across its two variants.
5. **Unscoped rich HTML.** The About section uses `dangerouslySetInnerHTML`; current local content is trusted, but a future CMS must sanitize or render structured content.
6. **No automated regression safety.** There are no component, route, or browser tests protecting the hero and release cards.
7. **Lint currently fails.** `ContactForm.tsx` declares an unused `error` variable in its catch block.
8. **Form resilience is thin.** There is no abort timeout, spam honeypot, or explicit accessible live region for status.
9. **SEO content is already drifting.** The HTML JSON-LD and descriptions contain release dates/content that do not fully match `releases.json`.
10. **Navigation logic is homepage-specific.** Smooth-scroll anchors and route navigation are not yet unified.
11. **One extremely long Spotify URL appears to include transient tracking/client metadata.** Replace it with a stable canonical release URL or the existing smart link.
12. **GitHub Actions uses Node 20 while the local environment is Node 24.19.** A future React Router framework upgrade requires alignment.

## 3. Direct comparison

| Dimension | Reference Angular site | Current React site | Target |
|---|---|---|---|
| Visual identity | Cinematic media, red/black, editorial | Dark cards, blue accent, polished hero | Reference shell + protected current hero/cards |
| Routes | Rich multi-page hierarchy | One route with anchors | Static pre-rendered route modules |
| Content | Runtime Contentful | Local JSON | Typed local content first; optional CMS adapter |
| State | NgRx global store | Local component state | Loaders/content functions + local state; no global store |
| SEO | Runtime title/meta updates | Strong but single static document | Per-route build-time metadata and JSON-LD |
| Performance | Heavy framework/media and eager module | Small bundle | Code-split static HTML; constrained background media |
| Failure modes | Runtime CMS and unchecked first item | Build-time local data | Build-time validation and explicit empty states |
| Hosting | GitHub Pages | GitHub Pages/custom domain | Keep GitHub Pages unless CMS previews require another host |
| Maintainability | Many coupled Angular services/components | Simple but homepage-centric | Route/domain organization with shared primitives |

## 4. Architecture decision record

### ADR-001: Evolve the current React project into a statically pre-rendered band site

**Status:** Proposed

**Decision date:** 2026-08-27

**Decision owner:** Project maintainer

### Context

The site is content-heavy but interaction-light. It needs fast public pages, good search/social metadata, low operational cost, simple authoring, and maximum preservation of existing React UI. GitHub Pages is already working.

### Options considered

| Option | Preservation | SEO | Runtime cost | Migration cost | Verdict |
|---|---:|---:|---:|---:|---|
| Keep current declarative SPA | Excellent | Weak per route | Low | Low | Good short-term baseline only |
| React Router Framework Mode + static pre-render | Excellent | Excellent | Low | Medium | **Selected end state** |
| Astro static site + React islands | Good | Excellent | Lowest | Medium/high | Strong alternative if a broader rewrite is accepted |
| Rebuild in Angular like the reference | Poor | Medium | High | High | Reject |

### Decision

Use a two-stage migration:

1. reproduce the reference visual language and page primitives in the current React/Vite application while preserving existing UI;
2. after visual regression tests exist, adopt React Router Framework Mode and statically pre-render all public routes.

The official React Router documentation describes Framework Mode as adding route modules, automatic code splitting, static rendering, loaders, metadata, and typed route APIs. Static pre-rendering with `ssr: false` produces deployable HTML and data files without requiring a runtime server. At the report date, the current framework-adoption guidance requires Node 22.22+, Vite 7+, and the corresponding supported React version. The local Node 24 environment is suitable, but the workflow and React dependencies must be aligned before that migration.

### Why Astro is not selected

Astro is technically well suited to a mostly static music site and can retain React components as islands. It would, however, introduce a second component model and force a larger structural rewrite while preservation of the existing hero/cards is a hard requirement. It remains the fallback if the project later prioritizes minimal client JavaScript above React continuity.

### Consequences

- Existing interactive React components remain reusable.
- Public pages can have static HTML and route-specific metadata on GitHub Pages.
- No runtime backend is required for ordinary content.
- The router migration must be isolated from the visual migration.
- CI must move from Node 20 to a supported Node version and deploy the framework build output rather than assuming `dist` forever.
- Dynamic contact form submission remains an external service concern.

## 5. Target project design

### Target layers

```text
app or src/
├── routes/                  # URL-owned route modules and metadata
├── layouts/                 # Site shell and editorial page shell
├── components/
│   ├── design-system/       # Button, PageTitle, PageSection, icons
│   ├── navigation/          # Header, desktop submenu, mobile menu
│   ├── media/               # BackgroundMedia, YouTube facade
│   └── music/               # Hero, Releases, ReleaseCard (protected)
├── content/
│   ├── site.*               # Navigation, social, global SEO
│   ├── releases.*
│   ├── shows.*
│   ├── pages.*
│   └── news/                # Markdown/MDX or typed records
├── domain/                  # CTA, Release, Show, Article, StreamingLink
├── lib/
│   ├── content/             # schema validation and repository interface
│   ├── seo/                 # canonical, OG, MusicGroup/MusicAlbum JSON-LD
│   └── media/               # video/image helpers
└── styles/
    ├── tokens.css
    ├── reference-shell.css
    └── protected-music.css
```

Do not start by moving every current file. Add these boundaries incrementally, and move only when a route or shared abstraction needs them.

### Content strategy

Use typed local content for the first production version.

- Releases, shows, navigation, social links, and page configuration: TypeScript data modules validated at build time.
- News, story, and lyrics: Markdown/MDX or structured TypeScript content with front matter/schema validation.
- Assets: local optimized files with explicit dimensions, alternative text, poster images, and media budgets.
- CMS: introduce only if a non-developer needs independent publishing. Hide the CMS behind a `ContentRepository` interface so routes do not know whether content comes from files or Contentful.
- Never fetch the entire public site from Contentful in the browser. If a CMS is added, prefer build-time loading and deploy hooks.

### State strategy

Do not add Redux, NgRx, Zustand, or another global store. Route loaders/static content functions own content; components own transient UI state such as menu open/closed and form submission. Derived values such as the featured release are pure selectors that return an explicit result or a safe empty state.

### Design-token strategy

Add reference-shell tokens without silently changing protected components:

```css
:root {
  --shell-bg: #0a0a0a;
  --shell-text: #fdfdfd;
  --shell-muted: #7e848c;
  --shell-muted-light: #d7d7d7;
  --shell-accent: #ad0e10;
  --shell-accent-hover: #ef090c;
  --shell-content-width: 1280px;
  --shell-space-unit: 10px;

  /* Existing protected music palette remains unchanged. */
  --music-bg: #121212;
  --music-bg-alt: #0c0c0c;
  --music-text: #e5e5e5;
  --music-muted: #8e8e8e;
  --music-accent: #778dfb;
}
```

Global navigation/editorial components use `--shell-*`. Hero and release-card styling use `--music-*` until the maintainer explicitly approves a unified recolor.

### Route plan

Only publish routes with real content. Hidden/incomplete routes must not appear in navigation or the sitemap.

| Route | Purpose | Initial source |
|---|---|---|
| `/` | Existing protected hero, About preview, releases, contact preview | Current JSON/typed data |
| `/about` | Band/artist overview | Existing About content |
| `/story` | Long-form story | New content required |
| `/timeline` | Milestones | New content required |
| `/music` or `/releases` | Complete catalog | Existing releases |
| `/releases/:slug` | Release detail, credits, links, tracks | Extended release model |
| `/lyrics` and `/lyrics/:slug` | Search/list and song lyrics | New content required |
| `/videos` | Video catalog | New content required |
| `/shows` | Upcoming/past shows | New content required |
| `/news` and `/news/:slug` | Updates and editorial content | New content required |
| `/contact` | Booking/contact options and form | Existing contact data |

### Background-media contract

- Use `<video muted autoPlay loop playsInline>` only when a video is configured.
- Always provide a compressed poster image.
- Respect `prefers-reduced-motion` by showing the poster and not auto-playing.
- Use responsive sources and `object-fit: cover`.
- Keep text contrast independent of the underlying frame with a stable overlay.
- Do not preload the full video on mobile; prefer `preload="metadata"` or poster-only behavior.
- Target a background video under 4 MB where practical; never ship the reference 18.5 MB source unchanged.
- Use route-specific media and unload media that is no longer visible.

### Accessibility contract

- One `h1` per route and a logical heading sequence.
- Visible focus styling at least as clear as hover styling.
- Escape closes the mobile menu; focus is trapped while open and restored to the trigger on close.
- Desktop submenus work with keyboard focus, not hover alone.
- Menu buttons expose accurate `aria-expanded` and `aria-controls`.
- Background media is decorative; meaningful imagery uses an `<img>` with useful alt text.
- Form status uses an `aria-live` region.
- Motion effects have reduced-motion alternatives.
- Streaming icon links retain descriptive accessible names.

### SEO contract

- Route-specific title, description, canonical URL, Open Graph, and social image.
- Build-time sitemap derived from the same route/content registry.
- JSON-LD derived from release data, never maintained as a second hardcoded catalog.
- Use `MusicGroup` or `Person/MusicGroup` according to the real project identity; releases use `MusicAlbum`/`MusicRecording` where appropriate.
- Unpublished content is omitted from navigation, sitemap, and structured data.
- Social images use absolute production URLs.

## 6. Implementation sequence

### Phase 0 — Establish the safety net

1. Fix the current lint error without changing behavior.
2. Add component/browser visual regression coverage for desktop and mobile hero/release cards.
3. Record current build sizes and accessibility snapshot.
4. Add content fixtures for: featured release present, absent, missing streaming links, and long titles.
5. Do not modify design in this phase.

### Phase 1 — Introduce the reference shell

1. Add shell tokens alongside current protected tokens.
2. Rework Header into the reference desktop composition.
3. Add an accessible image-backed desktop submenu primitive.
4. Adapt MobileDrawer into the full-screen accent panel.
5. Rework Footer into the compact centred social/streaming layout.
6. Add `BackgroundMedia` with video, image, poster, overlay, and reduced-motion support.
7. Place the unchanged current Hero inside the new shell.

### Phase 2 — Add editorial page primitives

Implement `PageTitle`, `PageContentSurface`, `PageSection`, `FeaturedTile`, `FeaturedTileGrid`, and `Timeline`. Match reference geometry and interaction, but use semantic markup and keyboard-safe behavior.

### Phase 3 — Establish real routes and content models

1. Add domain types and build-time schemas.
2. Add only routes supported by available content.
3. Unify hash scrolling and route navigation.
4. Add route error/empty states.
5. Keep the current homepage content composition.

### Phase 4 — Adopt static pre-rendering

1. Upgrade the React/Router dependencies in a dedicated commit.
2. Align CI and local Node versions.
3. Follow the official React Router “Framework Adoption from Component Routes” path.
4. Configure `ssr: false` and pre-render every published route, including known dynamic slugs.
5. Update GitHub Pages output path and fallback handling based on the generated build.
6. Verify direct navigation and refresh on every route.

### Phase 5 — Content pages

Build in this order: About, releases index, release detail, Contact, Shows, News, News detail, Videos, Lyrics, Song detail, Story, Timeline. This order reuses current content first and delays routes that require new editorial material.

### Phase 6 — Hardening

- SEO/structured-data generation and consistency tests.
- Form timeout, honeypot, accessible states, and privacy copy.
- Image/video optimization and lazy loading.
- Route-level code splitting and bundle budgets.
- Cross-browser, keyboard, screen-reader, and reduced-motion checks.
- 404 page and broken-link check.

## 7. AI execution prompts

Use one prompt at a time. Each prompt assumes the AI can read this repository and this report. Require a clean verification result before moving to the next prompt.

### Prompt 0 — Read, inventory, and protect

```text
Read OFCHRIST-DESIGN-MIGRATION-REPORT.md completely. Inspect the current repository and treat the existing Hero, Releases, and ReleaseCard UI as protected. Do not implement the redesign yet.

Create a concise implementation plan grounded in the current files. Add the smallest practical automated regression safety net for these protected components at desktop and mobile sizes. Cover a present featured release, no featured release, missing optional streaming links, and a long title. Fix only the existing lint error and any test-enablement issues. Do not change current visuals, content, routes, or dependencies beyond what the test setup requires.

Verify with lint, tests, production build, and desktop/mobile screenshots. Report changed files, commands, and remaining risks.
```

### Prompt 1 — Add design tokens and background media

```text
Read OFCHRIST-DESIGN-MIGRATION-REPORT.md and the regression coverage from Prompt 0. Implement the reference-shell design tokens in a way that does not alter the protected Hero, Releases, or ReleaseCard visuals. Add a reusable BackgroundMedia component supporting responsive image/video, poster, overlay, playsInline, reduced motion, and safe fallback behavior.

Do not add final band media or invent content. Use the current homepage background as the fallback fixture. Avoid global CSS that leaks into protected components. Add tests for image fallback and reduced-motion behavior.

Verify lint, tests, build, and visual equivalence of the protected components.
```

### Prompt 2 — Rebuild global navigation and footer

```text
Using the report as the visual and architecture specification, adapt the current Header, NavMenu, MobileDrawer, Footer, and SocialLinks to the Of Christ shell: transparent/sticky desktop header, upper-left logo, upper-right uppercase navigation, optional image-backed submenus, compact centred footer, and full-screen accent mobile menu.

Preserve the current homepage hero and release cards exactly. Use React state and semantic HTML; do not manipulate document classes directly. Implement keyboard-operable submenus, Escape-to-close, focus trapping/restoration, aria-expanded/aria-controls, body scroll locking, external-link safety, and reduced-motion behavior. Navigation content remains data-driven. Do not expose routes that do not exist yet.

Verify desktop, tablet, and mobile layouts; keyboard navigation; lint; tests; and build.
```

### Prompt 3 — Build editorial primitives

```text
Implement reusable PageTitle, PageContentSurface, PageSection, FeaturedTile, FeaturedTileGrid, and Timeline components matching the reference patterns documented in OFCHRIST-DESIGN-MIGRATION-REPORT.md. Use shell tokens, semantic markup, responsive CSS, and accessible focus/hover parity.

PageTitle must reproduce the oversized uppercase title behavior. PageContentSurface must reproduce the delayed black content plane and deep top fade without fixed magic layout that clips small screens. FeaturedTileGrid must reproduce the dim-siblings/scale-focused-tile effect, disabled for reduced motion and touch where inappropriate.

Create isolated examples/tests, but do not yet add incomplete public routes or fake band content. Verify no regression to the protected components.
```

### Prompt 4 — Create typed content and route foundations

```text
Refactor the content boundary described in the report. Create canonical domain types for CTA, navigation, social links, streaming links, releases, pages, shows, articles, and SEO. Remove duplicated interfaces only where safe. Add build-time validation and explicit error messages naming the invalid content record.

Add route foundations for `/`, `/about`, `/releases`, and `/contact` using only existing real content. Keep unpublished routes absent from navigation and sitemap. Replace the unsafe featuredRelease non-null assertion with an explicit selector and safe empty behavior. Unify route links and homepage hash scrolling.

Do not introduce a global store or CMS. Do not redesign Hero, Releases, or ReleaseCard. Verify direct route navigation, refresh behavior in the current hosting mode, lint, tests, build, and content validation failures.
```

### Prompt 5 — Migrate to React Router Framework Mode and pre-render

```text
Treat this as an isolated architecture migration. Read the report and inspect the installed versions before editing. Consult current official React Router documentation for Framework Adoption from Component Routes and Pre-Rendering; do not rely on stale syntax.

Upgrade React, React DOM, and React Router only to a mutually supported set. Align the GitHub Actions Node version with the supported local version. Adopt route modules incrementally, configure static hosting with runtime SSR disabled, and pre-render every published static route plus all known dynamic content paths. Preserve component markup and CSS unless the framework requires a narrow wrapper change.

Update the GitHub Pages workflow to deploy the actual framework client output. Ensure custom-domain base URLs, assets, 404/fallback behavior, direct navigation, refresh, metadata, and client navigation all work. Provide an explicit rollback note.

Verify lint, all tests, build, generated HTML for every route, local static serving, and desktop/mobile visual regression.
```

### Prompt 6 — Build release and music routes

```text
Build the releases index and release-detail routes from the canonical release model. Reuse the existing Releases and ReleaseCard components; do not create a competing card design. Extend data only for factual fields that exist, such as credits, track list, dates, videos, lyrics links, and stable streaming URLs. Never invent content.

Use the reference PageTitle/PageContentSurface pattern on route pages. Generate route metadata and MusicAlbum/MusicRecording structured data from the same release records. Replace transient tracking URLs with stable configured URLs when a verified canonical or smart-link URL already exists.

Verify missing-artwork, missing-platform, long-title, and invalid-slug states; route pre-rendering; accessibility; lint; tests; and build.
```

### Prompt 7 — Add editorial routes when content exists

```text
Using the report's route plan, add only the Shows, News, News detail, Videos, Lyrics, Song detail, Story, and Timeline routes for which real project content has been supplied. Use the shared editorial primitives and typed content repository. Keep absent routes unpublished.

Do not copy fictional Of Christ text, dates, shows, members, news, lyrics, IDs, or media into the real project. Do not fetch Contentful at runtime. Generate static paths and metadata from the content registry. Provide clear empty states for valid but empty collections such as “No upcoming shows”.

Verify every generated route, sitemap membership, internal links, route metadata, responsive layout, keyboard behavior, lint, tests, and build.
```

### Prompt 8 — Harden form, performance, accessibility, and SEO

```text
Perform the final hardening pass described in OFCHRIST-DESIGN-MIGRATION-REPORT.md. Improve the contact form with a timeout/abort path, honeypot, accessible live status, disabled-state correctness, and privacy-safe behavior without changing providers unless requested.

Optimise imagery and background media, use posters and responsive dimensions, respect reduced motion, and enforce budgets. Generate canonical tags, Open Graph/Twitter data, sitemap, robots rules, and JSON-LD from canonical content. Remove metadata duplication and stale release facts.

Audit keyboard use, focus visibility, heading order, contrast, alt text, menu focus management, external links, 404 handling, and direct-route refreshes. Keep homepage initial JavaScript at or below 120 kB gzip unless a documented exception is approved; keep non-media layout CLS below 0.1 and target LCP below 2.5 seconds in a representative production audit.

Run the complete verification suite and provide a final before/after summary with any remaining exceptions.
```

### Reusable prompt for any future AI task

```text
Before changing this project, read OFCHRIST-DESIGN-MIGRATION-REPORT.md. Treat Hero, Releases, and ReleaseCard as protected UI. Use the reference site for visual intent only; do not copy its Angular/NgRx implementation or fictional content. Keep content typed, local/build-time by default, routes pre-renderable, accessibility first-class, and GitHub Pages compatible. Make the smallest cohesive change, verify lint/tests/build and relevant responsive views, and explicitly report any deviation from the protected-component or architecture contracts.
```

## 8. Verification gates

A phase is complete only when all relevant gates pass.

### Functional

- Header and footer appear on every route.
- Desktop and mobile navigation reach only published routes.
- Direct URL loads and browser refresh work on GitHub Pages-compatible output.
- Featured release can be absent without crashing.
- Every configured streaming link points to the intended stable target.
- Contact form exposes idle, sending, success, timeout, and error states.

### Visual

- Protected Hero and ReleaseCard screenshots match their baseline within the agreed threshold.
- Desktop header matches the reference composition and spacing.
- Mobile menu is full-screen and visually intentional.
- Editorial page title/content transition matches the reference relationship.
- No content clips at 320, 390, 768, 1024, and 1440px widths.

### Accessibility

- Full site can be operated with a keyboard.
- No focus escapes an open modal mobile menu.
- Focus is restored when the menu closes.
- Reduced-motion users do not receive autoplay background movement.
- One meaningful page `h1`, valid labels, and accessible icon names.

### Quality

- `npm run lint` passes.
- All tests pass.
- Production build passes with no unexplained warning.
- Content schema validation passes.
- No broken internal links or duplicate route IDs/slugs.
- No private CMS, management, or form credentials enter the client bundle.

### Performance and SEO

- Every public route has rendered HTML and unique metadata.
- Sitemap and JSON-LD use the canonical content registry.
- Background media has a poster and a documented compressed size.
- Homepage initial JavaScript remains within budget.
- Images reserve space and avoid layout shift.

## 9. Immediate backlog

| Priority | Item | Reason |
|---|---|---|
| P0 | Protect Hero/ReleaseCard with regression tests | Hard user requirement |
| P0 | Fix the existing lint failure | Required quality baseline |
| P0 | Replace unsafe `featuredRelease!` | Prevent homepage crash |
| P1 | Add shell tokens and BackgroundMedia | Foundation of the reference design |
| P1 | Rebuild accessible Header/MobileDrawer/Footer | Largest global visual change |
| P1 | Add About/Releases/Contact routes from existing content | Immediate multi-page value |
| P1 | Move SEO/JSON-LD to canonical content | Stop release-data drift |
| P2 | Adopt Framework Mode static pre-rendering | Route SEO, code splitting, future-proofing |
| P2 | Add release-detail routes | Shareable music content |
| P2 | Add form hardening | Reliability and accessibility |
| P3 | Add Shows/News/Lyrics/Timeline after content exists | Avoid fictional placeholders |
| P3 | Add a CMS adapter only if authoring workflow demands it | Avoid premature complexity |

## 10. Source notes

- Reference live behavior: [gabrielramos.app/ofchrist-website](https://gabrielramos.app/ofchrist-website/)
- Reference source: [gaoliver/ofchrist-website](https://github.com/gaoliver/ofchrist-website)
- React Router: [Framework Adoption from Component Routes](https://reactrouter.com/upgrading/component-routes)
- React Router: [Pre-Rendering](https://reactrouter.com/how-to/pre-rendering)
- Vite: [Deploying a Static Site](https://vite.dev/guide/static-deploy.html)
- Alternative considered: [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- Astro React interoperability: [React integration](https://docs.astro.build/en/guides/integrations-guide/react/)

The reference site's values and behavior were taken from its public code and rendered site. Recommendations and target thresholds are architectural judgments for this project, not claims made by the reference repository.
