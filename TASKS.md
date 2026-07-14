# Tasks: Group Reunion Card PWA

Goal: turn [REUNIONCARD.md](REUNIONCARD.md) into a single-page, installable, offline-capable PWA. Vanilla HTML/CSS/JS (ES modules) only — no build step, no bundler, no frameworks, no npm dependencies.

Target file layout:

```
index.html
manifest.webmanifest
sw.js
css/
  styles.css
js/
  app.js
  data.js
  render.js
  nav.js
  progress.js
icons/
  icon.svg
  icon-192.png
  icon-512.png
  icon-maskable.png
```

Work through phases in order — each phase depends on the one before it.

---

## Phase 1 — Scaffolding

- [x] Create the folder structure above (`css/`, `js/`, `icons/`) under the project root.
- [x] Create `index.html` with a semantic shell: `<head>` with charset, viewport meta, title "Group Reunion Card", `<link>` to `css/styles.css`, `<link rel="manifest">`, `<script type="module" src="js/app.js">`. `<body>` with a `<header>` (title + progress bar placeholder), a `<nav>` placeholder for section tabs, a `<main id="app">` mount point, and a `<footer>` with the copyright line from REUNIONCARD.md.
- [x] Create empty `css/styles.css` and `js/app.js` (module) so the shell loads without console errors.
- [x] Serve the folder with a static file server (e.g. `npx serve` or `python -m http.server`) — no build tooling — and confirm the blank shell loads in a browser.

## Phase 2 — Content model

- [x] Create `js/data.js` exporting a plain JS array/object literal (no JSON fetch needed, keeps it offline-safe with zero network requests) that encodes every section of REUNIONCARD.md:
  - `opening` — Hebrews 10:24-25 quote, "start by deciding who is to lead" line, the Come Holy Spirit versicles/collect, the Lord's Prayer (both `traditional` and `contemporary` text blocks), and the "we share, review, plan…" explainer paragraph.
  - `piety` — John 15:5 quote, "Prayer and Worship" prompt, the 8-item example table (Eucharist/Prayer/Other corporate worship/Daily Office/Meditation-Reflection/Reconciliation/Retreat-Quiet Day/Spiritual Direction), and the "moment you felt close to Christ" prompt.
  - `study` — Romans 12:2 quote, "Christian Formation" prompt, its 8-item example table (Bible reading/Art music or nature/A book/Group Study/A sermon/A course or lecture/A play film or video/A conversation), and the "Study of Environments" prompt.
  - `apostolicAction` — John 20:21 quote, "Transforming the World for Christ" prompt with its 3-item example list (home or family life / workplace, friends, neighbours / wider community), "Making Disciples" prompt, "Reviewing your plans" prompt, "Planning Your Apostolic Action" prompt, "Working Together" prompt.
  - `closing` — Colossians 3:17 quote, the 3-item prayer-intention list (one another / any who are absent / those who need our prayers), the closing thanksgiving prayer, and the © British Anglican Cursillo Council 2003 line.
  - Each *prompt* item (the discussion questions a group responds to — not the section headings or scripture) needs a stable unique `id` string (e.g. `piety-prayer-worship`, `study-formation`) since these are the units progress tracking will check off.
- [x] Give every section object an `id` (`opening`, `piety`, `study`, `apostolic-action`, `closing`) and a short `navLabel` for the nav bar (`Opening`, `Piety`, `Study`, `Apostolic Action`, `Closing`).

## Phase 3 — Rendering

- [x] Create `js/render.js` exporting a function that takes one section object from `data.js` and returns a DOM fragment (use `document.createElement`/`template` literals assigned via `innerHTML` on a detached node — no library).
- [x] Render scripture quotes as `<blockquote>` + `<cite>`.
- [x] Render each prompt as a labelled `<label>` wrapping a `<input type="checkbox">` (bound to the prompt's `id`) followed by the prompt text, so checking it off is the "progress" unit.
- [x] Render "example" lists as a semantic `<table>` (two-column, matching the layout already in REUNIONCARD.md) or `<ul>` for the 3-item lists in Apostolic Action/Closing.
- [x] Render the Lord's Prayer as two `<details>`/`<summary>` blocks ("Traditional" / "Contemporary") so only one is expanded at a time on screen, or a small toggle — pick whichever needs the least JS; document the choice in a code comment only if non-obvious.
- [x] Wire `js/app.js` to import `data.js` + `render.js`, render all five sections into `#app` on load (all sections in the DOM at once, toggled visible/hidden by nav — simplest offline-safe approach, avoids re-render churn).

## Phase 4 — Navigation

- [x] Create `js/nav.js` exporting a function that builds the `<nav>` tab bar from the section list in `data.js` (one button per section, `aria-current="page"` on the active one).
- [x] Implement hash-based routing: reading `location.hash` on load and on `hashchange` to decide which section is visible; default to `#opening` when hash is empty/unrecognized.
- [x] Add Prev/Next buttons (footer or header) that move to the adjacent section in array order, wrapping or disabling at the ends. (Disabling at the ends.)
- [x] Add left/right arrow-key navigation when focus is inside `<main>`, and make sure tab order through nav buttons is logical.
- [x] Update `document.title` to `"<Section> – Group Reunion Card"` on navigation.

## Phase 5 — Progress tracking

- [x] Create `js/progress.js` exporting `getProgress()`, `setChecked(promptId, bool)`, `resetProgress()`, backed by `localStorage` (single JSON blob under one key, e.g. `reunion-card-progress`).
- [x] On checkbox change in a rendered section, call `setChecked` and persist immediately.
- [x] On load, hydrate every checkbox's checked state from `localStorage` before first paint (or immediately after render, guarded to avoid a visible flash).
- [x] Compute and display an overall progress bar in the `<header>` (checked prompts / total prompts across all sections).
- [x] Compute and display a per-section indicator in the nav bar (e.g. "3/4" badge or a small filled-ring) so a group can see at a glance which sections are done.
- [x] Add a "Reset progress" control (with a confirm step, since it's destructive to the group's saved state) that calls `resetProgress()` and re-hydrates the UI.

## Phase 6 — PWA manifest & installability

- [x] ~~Create `icons/icon.svg` — a simple original vector mark~~ — superseded: user supplied the source mark directly as `icons/CursilloCross.png` (a raster cross/circle-of-people motif), so that is the master asset instead of an authored SVG.
- [x] Export/rasterize `icons/icon-192.png`, `icons/icon-512.png`, and `icons/icon-maskable.png` (512×512 with safe-zone padding for maskable) from `icons/CursilloCross.png` (via Pillow — one-off asset prep, not part of the shipped app). Also generated `icons/favicon-32.png` / `icons/favicon-48.png` for the browser tab.
- [x] Create `manifest.webmanifest`: `name` "Group Reunion Card", `short_name` "Reunion Card", `start_url` "/", `scope` "/", `display` "standalone", `background_color`/`theme_color` matching `styles.css`, and the `icons` array (including one `"purpose": "maskable"` entry).
- [x] Link the manifest in `index.html` `<head>` (`<link rel="manifest" href="manifest.webmanifest">`), plus `<meta name="theme-color">` and `<link rel="apple-touch-icon" href="icons/icon-192.png">` for iOS/Safari installability.
- [x] Add favicon links using `icons/favicon-32.png` / `icons/favicon-48.png`.

## Phase 7 — Offline support (service worker)

- [x] Create `sw.js` at the project root (root scope needed to control the whole app).
- [x] On `install`, open a versioned cache (e.g. `reunion-card-v1`) and `addAll` the app shell: `index.html`, `manifest.webmanifest`, `css/styles.css`, every file in `js/`, and the icon files.
- [x] On `activate`, delete any caches whose name doesn't match the current version, and `self.clients.claim()`.
- [x] On `fetch`, serve same-origin GET requests cache-first with a network fallback that populates the cache (stale-while-revalidate is fine here since content is static); for navigation requests, fall back to the cached `index.html` when offline.
- [x] Register the service worker from `js/app.js` (`navigator.serviceWorker.register('/sw.js')`) behind a `'serviceWorker' in navigator` feature check, after the `load` event.
- [x] Bump the cache version string in `sw.js` any time app-shell files change, so returning users get updates instead of a stale cache.

## Phase 8 — Styling & polish

- [x] Write `css/styles.css`: mobile-first layout (this is used by small groups, often on phones), readable type scale, sticky header with progress bar, nav bar that scrolls horizontally on narrow viewports.
- [x] Add `prefers-color-scheme: dark` styles.
- [x] Style checkboxes/labels with a large enough hit target for touch. (44px min-height rows, 1.4rem checkboxes.)
- [x] Style `<table>` example lists to collapse sensibly on narrow screens (e.g. stacked rows below a breakpoint). Also set `table-layout: fixed` + `overflow-wrap` so the table can never overflow its container at any width, not just below the collapse breakpoint.
- [x] Add visible `:focus-visible` states for keyboard nav (nav buttons, checkboxes, prev/next).

## Phase 9 — Verification

- [x] Serve locally over plain static hosting (no build step) and manually click through all five sections via nav, prev/next, and keyboard arrows. (Automated via a scripted-event harness: nav-button clicks, Next/Previous, and both ArrowRight/ArrowLeft all navigated to the correct section and updated `document.title` correctly.)
- [x] Check a few boxes, reload the page, confirm state persists; use "Reset progress" and confirm it clears. (Checked a prompt, reloaded — checkbox stayed checked and progress bar read "1 / 9 completed"; clicked Reset progress — checkbox cleared, progress read "0 / 9", and `localStorage` was wiped.)
- [x] In DevTools, throttle to "Offline" and reload — confirm the app still loads and functions fully offline. (Killed the static server process entirely — stronger than throttling — and reloaded, including a hash-routed section: full app shell and content rendered from the service-worker cache with zero network available.)
- [x] Run a Lighthouse PWA audit and confirm the installability criteria pass (manifest valid, service worker controls start_url, icons present). Note: the installed Lighthouse (13.4.0) has dropped the dedicated "pwa" category entirely, so this was done as a direct criteria check via the browser's own APIs instead: manifest fetches with correct name/start_url/display/icons, all three icon files fetch 200, and the service worker registers → installs → reaches `active.state=activated` and controls the origin, with `caches.keys()` showing the correctly-versioned `reunion-card-v3` cache. Bonus: Lighthouse's other categories scored accessibility 1.0, best-practices 1.0, performance 0.95, seo 0.9 (only ding: no `<meta name="description">`, optional/out of scope).
- [~] Test the install prompt / "Add to Home Screen" flow on at least one desktop and one mobile browser. Not fully verifiable in this headless/no-mobile-device environment — `beforeinstallprompt` capture was attempted but Chrome gates it behind multi-visit engagement heuristics that don't apply to a single automated load. All underlying installability criteria are independently confirmed above (manifest + active/controlling service worker), which is what actually determines eligibility. **Recommend the user manually confirm the install icon/prompt appears in a real desktop Chrome/Edge address bar and via "Add to Home Screen" on a phone.**
- [~] Quick cross-browser smoke test (Chrome/Edge, Firefox, Safari) since this targets a general parish audience, not just one browser. Verified in both Edge and Chrome (separate vendor builds) — identical rendering and behavior. Firefox and Safari are not installed on this Windows dev machine, so untested; the app only uses widely-supported standard features (ES modules, Cache API, Service Workers, CSS custom properties, `<details>`), so no major compatibility risk is expected, but **recommend the user spot-check on Firefox/Safari/iOS if available.**
