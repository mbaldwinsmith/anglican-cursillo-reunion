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

- [ ] Create the folder structure above (`css/`, `js/`, `icons/`) under the project root.
- [ ] Create `index.html` with a semantic shell: `<head>` with charset, viewport meta, title "Group Reunion Card", `<link>` to `css/styles.css`, `<link rel="manifest">`, `<script type="module" src="js/app.js">`. `<body>` with a `<header>` (title + progress bar placeholder), a `<nav>` placeholder for section tabs, a `<main id="app">` mount point, and a `<footer>` with the copyright line from REUNIONCARD.md.
- [ ] Create empty `css/styles.css` and `js/app.js` (module) so the shell loads without console errors.
- [ ] Serve the folder with a static file server (e.g. `npx serve` or `python -m http.server`) — no build tooling — and confirm the blank shell loads in a browser.

## Phase 2 — Content model

- [ ] Create `js/data.js` exporting a plain JS array/object literal (no JSON fetch needed, keeps it offline-safe with zero network requests) that encodes every section of REUNIONCARD.md:
  - `opening` — Hebrews 10:24-25 quote, "start by deciding who is to lead" line, the Come Holy Spirit versicles/collect, the Lord's Prayer (both `traditional` and `contemporary` text blocks), and the "we share, review, plan…" explainer paragraph.
  - `piety` — John 15:5 quote, "Prayer and Worship" prompt, the 8-item example table (Eucharist/Prayer/Other corporate worship/Daily Office/Meditation-Reflection/Reconciliation/Retreat-Quiet Day/Spiritual Direction), and the "moment you felt close to Christ" prompt.
  - `study` — Romans 12:2 quote, "Christian Formation" prompt, its 8-item example table (Bible reading/Art music or nature/A book/Group Study/A sermon/A course or lecture/A play film or video/A conversation), and the "Study of Environments" prompt.
  - `apostolicAction` — John 20:21 quote, "Transforming the World for Christ" prompt with its 3-item example list (home or family life / workplace, friends, neighbours / wider community), "Making Disciples" prompt, "Reviewing your plans" prompt, "Planning Your Apostolic Action" prompt, "Working Together" prompt.
  - `closing` — Colossians 3:17 quote, the 3-item prayer-intention list (one another / any who are absent / those who need our prayers), the closing thanksgiving prayer, and the © British Anglican Cursillo Council 2003 line.
  - Each *prompt* item (the discussion questions a group responds to — not the section headings or scripture) needs a stable unique `id` string (e.g. `piety-prayer-worship`, `study-formation`) since these are the units progress tracking will check off.
- [ ] Give every section object an `id` (`opening`, `piety`, `study`, `apostolic-action`, `closing`) and a short `navLabel` for the nav bar (`Opening`, `Piety`, `Study`, `Apostolic Action`, `Closing`).

## Phase 3 — Rendering

- [ ] Create `js/render.js` exporting a function that takes one section object from `data.js` and returns a DOM fragment (use `document.createElement`/`template` literals assigned via `innerHTML` on a detached node — no library).
- [ ] Render scripture quotes as `<blockquote>` + `<cite>`.
- [ ] Render each prompt as a labelled `<label>` wrapping a `<input type="checkbox">` (bound to the prompt's `id`) followed by the prompt text, so checking it off is the "progress" unit.
- [ ] Render "example" lists as a semantic `<table>` (two-column, matching the layout already in REUNIONCARD.md) or `<ul>` for the 3-item lists in Apostolic Action/Closing.
- [ ] Render the Lord's Prayer as two `<details>`/`<summary>` blocks ("Traditional" / "Contemporary") so only one is expanded at a time on screen, or a small toggle — pick whichever needs the least JS; document the choice in a code comment only if non-obvious.
- [ ] Wire `js/app.js` to import `data.js` + `render.js`, render all five sections into `#app` on load (all sections in the DOM at once, toggled visible/hidden by nav — simplest offline-safe approach, avoids re-render churn).

## Phase 4 — Navigation

- [ ] Create `js/nav.js` exporting a function that builds the `<nav>` tab bar from the section list in `data.js` (one button per section, `aria-current="page"` on the active one).
- [ ] Implement hash-based routing: reading `location.hash` on load and on `hashchange` to decide which section is visible; default to `#opening` when hash is empty/unrecognized.
- [ ] Add Prev/Next buttons (footer or header) that move to the adjacent section in array order, wrapping or disabling at the ends.
- [ ] Add left/right arrow-key navigation when focus is inside `<main>`, and make sure tab order through nav buttons is logical.
- [ ] Update `document.title` to `"<Section> – Group Reunion Card"` on navigation.

## Phase 5 — Progress tracking

- [ ] Create `js/progress.js` exporting `getProgress()`, `setChecked(promptId, bool)`, `resetProgress()`, backed by `localStorage` (single JSON blob under one key, e.g. `reunion-card-progress`).
- [ ] On checkbox change in a rendered section, call `setChecked` and persist immediately.
- [ ] On load, hydrate every checkbox's checked state from `localStorage` before first paint (or immediately after render, guarded to avoid a visible flash).
- [ ] Compute and display an overall progress bar in the `<header>` (checked prompts / total prompts across all sections).
- [ ] Compute and display a per-section indicator in the nav bar (e.g. "3/4" badge or a small filled-ring) so a group can see at a glance which sections are done.
- [ ] Add a "Reset progress" control (with a confirm step, since it's destructive to the group's saved state) that calls `resetProgress()` and re-hydrates the UI.

## Phase 6 — PWA manifest & installability

- [ ] Create `icons/icon.svg` — a simple original vector mark (e.g. a cross/circle motif), since no existing icon assets exist in this repo.
- [ ] Export/rasterize `icons/icon-192.png`, `icons/icon-512.png`, and `icons/icon-maskable.png` (512×512 with safe-zone padding for maskable) from the SVG.
- [ ] Create `manifest.webmanifest`: `name` "Group Reunion Card", `short_name` "Reunion Card", `start_url` "/", `scope` "/", `display` "standalone", `background_color`/`theme_color` matching `styles.css`, and the `icons` array (including one `"purpose": "maskable"` entry).
- [ ] Link the manifest in `index.html` `<head>` (`<link rel="manifest" href="manifest.webmanifest">`), plus `<meta name="theme-color">` and `<link rel="apple-touch-icon" href="icons/icon-192.png">` for iOS/Safari installability.
- [ ] Add a favicon link using `icons/icon.svg`.

## Phase 7 — Offline support (service worker)

- [ ] Create `sw.js` at the project root (root scope needed to control the whole app).
- [ ] On `install`, open a versioned cache (e.g. `reunion-card-v1`) and `addAll` the app shell: `index.html`, `manifest.webmanifest`, `css/styles.css`, every file in `js/`, and the icon files.
- [ ] On `activate`, delete any caches whose name doesn't match the current version, and `self.clients.claim()`.
- [ ] On `fetch`, serve same-origin GET requests cache-first with a network fallback that populates the cache (stale-while-revalidate is fine here since content is static); for navigation requests, fall back to the cached `index.html` when offline.
- [ ] Register the service worker from `js/app.js` (`navigator.serviceWorker.register('/sw.js')`) behind a `'serviceWorker' in navigator` feature check, after the `load` event.
- [ ] Bump the cache version string in `sw.js` any time app-shell files change, so returning users get updates instead of a stale cache.

## Phase 8 — Styling & polish

- [ ] Write `css/styles.css`: mobile-first layout (this is used by small groups, often on phones), readable type scale, sticky header with progress bar, nav bar that scrolls horizontally on narrow viewports.
- [ ] Add `prefers-color-scheme: dark` styles.
- [ ] Style checkboxes/labels with a large enough hit target for touch.
- [ ] Style `<table>` example lists to collapse sensibly on narrow screens (e.g. stacked rows below a breakpoint).
- [ ] Add visible `:focus-visible` states for keyboard nav (nav buttons, checkboxes, prev/next).

## Phase 9 — Verification

- [ ] Serve locally over plain static hosting (no build step) and manually click through all five sections via nav, prev/next, and keyboard arrows.
- [ ] Check a few boxes, reload the page, confirm state persists; use "Reset progress" and confirm it clears.
- [ ] In DevTools, throttle to "Offline" and reload — confirm the app still loads and functions fully offline.
- [ ] Run a Lighthouse PWA audit and confirm the installability criteria pass (manifest valid, service worker controls start_url, icons present).
- [ ] Test the install prompt / "Add to Home Screen" flow on at least one desktop and one mobile browser.
- [ ] Quick cross-browser smoke test (Chrome/Edge, Firefox, Safari) since this targets a general parish audience, not just one browser.
