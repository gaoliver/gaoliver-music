# React Router Framework Mode migration

The site uses React Router Framework Mode with runtime SSR disabled. Every public route is rendered to static HTML during `npm run build` and written to `build/client` for GitHub Pages.

## Hosting behavior

- `react-router.config.ts` is the canonical pre-render path registry.
- Known pages are emitted as nested `index.html` files and support direct refreshes.
- `/404` is pre-rendered through the catch-all route; `scripts/postbuild.mjs` copies it to the root `404.html` required by GitHub Pages.
- The custom-domain base remains `/`, and files from `public/` are copied to the client output.

## Rollback

The preceding declarative-router state is commit `6d47fa4`. To roll back without rewriting history, revert the Framework Mode commit, restore `index.html`, `src/main.tsx`, and `src/App.tsx`, restore the Vite React plugin and `vite build` scripts, then change the Pages artifact directory back to `dist`.
