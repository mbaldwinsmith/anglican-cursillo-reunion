# Handoff: Group Reunion Card — warm continuous-scroll redesign

## Overview
A redesign of the Anglican Cursillo **Group Reunion Card** PWA. The old app showed one
section at a time with a top section-nav, an overall progress bar, per-prompt checkboxes,
and a prev/next pager. The new design is a **single, quiet, continuous-scroll reading
experience** built for a group reunion where everyone follows along on their own device:

- No checkboxes, no progress bar, no pager, no top nav. The prompts are simply read and discussed.
- One warm "paper" page you scroll top-to-bottom: cover → Opening → Piety → Study →
  Apostolic Action → Closing → footer.
- A single **quiet floating jump menu** (bottom-right) to hop between the five sections.
- The Lord's Prayer keeps both forms behind a small Traditional / Contemporary toggle.

## About the design files
The file in this bundle (`Reunion Card.dc.html`) is a **design reference** — a prototype
showing the intended look and behaviour. It is authored in a React-based "Design Component"
format and is **not** meant to be shipped as-is. Your task in Claude Code is to **recreate
this design inside your existing vanilla HTML/CSS/JS PWA** (`index.html`, `css/styles.css`,
`js/*.js`), keeping your service worker / offline setup. Do not introduce React or a build step.

## Fidelity
**High-fidelity.** Colours, typography, spacing and interactions are final. Recreate pixel-for-pixel
using your existing plain-JS patterns (the `data.js` content model + a `render.js`-style DOM builder).

---

## What changes in your codebase

Your current files and how they map to the new design:

- **`index.html`** — Remove `#progress-bar`, `#section-nav`, and the `#pager` block. Keep
  `<header>` (repurposed as the cover), `<main id="app">`, and `<footer>`. Add an empty
  `<div id="jump-menu">` before `</body>` (the menu is built in JS). Add the Google Fonts links.
- **`css/styles.css`** — Replace the token block and most rules with the new tokens/styles below.
  Drop `#progress-bar`, `#section-nav`, `.pager`, `.prompt input`, `.prompt label:hover`,
  `.lords-prayer-variant summary` (details/summary is replaced by a JS toggle), and the
  checkbox styles. Keep `box-sizing`, `:focus-visible`.
- **`js/data.js`** — Content is unchanged and still correct. You may drop the `id` field on
  `prompt` blocks (no longer progress-tracked) but it's harmless to leave.
- **`js/render.js`** — `renderPrompt` no longer renders a checkbox — render the prompt text as a
  paragraph (see below). `renderTable` becomes a wrapping row of "example" pills instead of a
  `<table>`. `renderLordsPrayer` becomes the toggle component. Scripture/versicles/list/heading/
  paragraph keep their block types but get the new styling.
- **`js/progress.js`** — **Delete.** No progress tracking anymore.
- **`js/nav.js`** — **Replace** the one-section-at-a-time router + pager with (a) rendering ALL
  sections into `#app` (no `hidden`), and (b) the floating jump menu + scroll-spy described under
  Interactions.
- **`js/app.js`** — Remove all progress/checkbox/reset wiring. Just: render all sections, init the
  jump menu, register the service worker.

---

## Screens / views

Single scrolling page. Content column is centered, `max-width: 34em`, `padding: 2.5em 1.6em`
per section. Base font size is set on the page wrapper (see Text size) and everything else is in
`em` so it scales as one unit.

### 1. Cover (the `<header>`)
- Centered column, `max-width: 34em`, `padding: min(14vh,7em) 1.6em 5em`. Fades up on load
  (`@keyframes rc-rise`: opacity 0→1, translateY 14px→0, 0.8s ease).
- **Medallion**: `8.4em × 8.4em` circle, `border-radius:50%`, `overflow:hidden`,
  `background:#fff`, ring + shadow `box-shadow: 0 0 0 1px var(--line), 0 14px 40px -18px rgba(60,40,20,.45)`.
  Contains the cross PNG (`icons/CursilloCross.png`) sized `118%` and nudged
  `object-position:center 46%; transform:translate(-8%,-6%)` so the artwork sits centered.
- **Eyebrow**: "ANGLICAN CURSILLO", Figtree 600, `font-size:.72em`, `letter-spacing:.28em`,
  uppercase, color `--accent`, margin-bottom `.9em`.
- **Title**: "Group Reunion Card", Newsreader 500, `font-size:2.9em`, `line-height:1.08`,
  `letter-spacing:-.01em`.
- **Motto**: "Christ is counting on you!" (italic, `--accent`, `1.28em`) then
  "…and I on Him!" (`--muted`) on the next line, `max-width:20em`.
- **Intro**: the movement description, `--ink-soft`, `1.02em`, `max-width:26em`, margin-top `1.8em`.
- **Cue**: "BEGIN TOGETHER" (Figtree, `.66em`, `letter-spacing:.22em`, uppercase, `--muted`) + a
  down-arrow ↓, stacked and centered, margin-top `2.6em`.

### 2–6. Sections (Opening, Piety, Study, Apostolic Action, Closing)
Each `<section>` starts with a centered header:
- **Roman numeral** (I–V), Figtree 600, `1em`, `letter-spacing:.32em`, color `--gold`.
- **Section title**, Newsreader 500, `2.05em`, margin-top `.15em`.

Then blocks in order (content is exactly your `data.js`):

- **Scripture** (`blockquote`): `padding:.2em 0 .2em 1.1em`, `border-left:2px solid var(--gold)`.
  Quote in Newsreader **italic**, `1.3em`, `--ink-soft`, `line-height:1.5`, wrapped in “ ” curly quotes.
  Reference in a `footer`: Figtree, `.8em`, `letter-spacing:.06em`, `--muted`, margin-top `.7em`.
- **Paragraph**: default body — Newsreader 400, `1em` (= base), `line-height:1.65`, `--ink`.
- **Versicle / response** (Opening only): a card `padding:1.2em 1.3em`, `background:var(--paper-2)`,
  `border:1px solid var(--line)`, `border-radius:.7em`. Two lines, each `display:flex; gap:.7em`.
  Line 1 marked with **℣** (U+2123) in `--gold`; line 2 marked with **℟** (U+211F) in `--accent`;
  both texts italic, response in `--ink-soft`. Marks use Figtree 600.
- **Sub-heading** (e.g. "Prayer and Worship"): Figtree 600, `.78em`, `letter-spacing:.18em`,
  uppercase, color `--accent`, margin `1.5em 0 .6em` (first) / `1.8em 0 .6em` (subsequent).
- **Prompt** (discussion question — NO checkbox): a paragraph at `font-size:1.12em`. The first
  prompt under a heading is plain; a *second* prompt that stands alone gets a quiet accent rule:
  `padding-left:1.1em; border-left:2px solid var(--accent-soft)`.
- **"For example" label**: Figtree, `.78em`, `letter-spacing:.1em`, uppercase, `--muted`,
  margin-bottom `.7em`.
- **Example pills** (replaces the old `<table>`): `display:flex; flex-wrap:wrap; gap:.5em`. Each item:
  `padding:.35em .9em; background:var(--paper-2); border:1px solid var(--line);
  border-radius:999px; font-size:.92em`. (Two-column table rows just become a flat pill list;
  e.g. "Meditation/Reflection" → "Meditation / Reflection".)
- **List** (`ul`, unstyled): `list-style:none; padding:0; display:flex; flex-direction:column; gap:.55em`,
  `--ink-soft`. Each `li` is `display:flex; gap:.7em` with a leading `•` bullet in `--gold`.
- **Closing thanksgiving prayer**: a centered card — `padding:1.3em 1.4em`, `background:var(--paper-2)`,
  `border:1px solid var(--line)`, `border-radius:.7em`, italic, `--ink-soft`, `text-align:center`.

### Lord's Prayer (in Opening)
- Row: heading "The Lord's Prayer" (Figtree 600, `1.05em`, `--accent`) + a flexible `1px` `--line`
  rule + a pill-group segmented toggle.
- **Toggle**: two buttons "Traditional" / "Contemporary" in a `--paper-2` pill container
  (`border:1px solid var(--line); border-radius:999px; padding:.2em`). Active button:
  `background:var(--accent); color:#fff`. Inactive: `transparent; color:var(--muted)`.
  Buttons are Figtree 600, `.72em`, `padding:.45em 1em`, `border-radius:999px`.
- Below: the selected prayer text, `1.06em`, `line-height:1.7`, `--ink-soft`. Default = Traditional.
- The two prayer texts are in `data.js` (`traditional`, `contemporary`).

### Footer
Centered. A `✝` (U+271D) in `--gold`, `1.1em`; then
"© British Anglican Cursillo Council 2003" (Figtree, `.78em`, `--muted`); then
"Anglican Cursillo® — Registered at the U.S. Patent Office" (Figtree, `.68em`, `--muted`, `opacity:.7`).

---

## Interactions & behaviour

### Page background
The wrapper has a soft top glow:
`background: radial-gradient(120% 60% at 50% -10%, rgba(255,252,245,.9) 0%, rgba(255,252,245,0) 55%), var(--paper);`

### Lord's Prayer toggle
Plain JS: clicking a button swaps the shown text and the active styling. State is local (no storage).

### Quiet jump menu (bottom-right, `position:fixed`)
- Container: `position:fixed; right:max(1.1em,env(safe-area-inset-right));
  bottom:max(1.1em,env(safe-area-inset-bottom)); z-index:50`. Column, items right-aligned, `gap:.7em`.
- **Trigger**: `3em × 3em` circle. Closed: `background:var(--paper-2); color:var(--ink-soft);
  border:1px solid var(--line)`. Open: `background:var(--accent); color:#fff; border-color:var(--accent)`.
  `box-shadow:0 10px 26px -12px rgba(60,40,20,.5)`. Icon = three stacked `1.05em × 1.5px`
  `currentColor` bars, `gap:4px`. `transition: background .2s, color .2s`.
- **Panel** (above the trigger): `background:var(--paper-2); border:1px solid var(--line);
  border-radius:.9em; padding:.5em; min-width:11em; box-shadow:0 18px 44px -20px rgba(60,40,20,.5)`.
  Open/close animation: `transform-origin:bottom right; transition:opacity .22s, transform .22s`;
  closed = `opacity:0; transform:translateY(8px) scale(.96); pointer-events:none`, open = `opacity:1; transform:none`.
- **Items**: "↑ Top", then "I Opening", "II Piety", "III Study", "IV Apostolic Action", "V Closing".
  Each: `display:flex; align-items:center; gap:.6em; width:100%; text-align:left`, Figtree,
  `.82em`, `border-radius:.55em; padding:.6em .8em`. Roman numeral in a `1.4em`-wide `--gold` slot.
  Default color `--ink-soft` / weight 500. **Active** (current section): `background:var(--accent-soft);
  color:var(--accent)`, weight 600.
- **Scroll-spy**: on `scroll` (passive), the active section = the last section whose
  `top + scrollY <= scrollY + innerHeight*0.35`. Update the highlighted item.
- **Jump on click**: close the menu and scroll to the section top minus `12px`.

### ⚠️ Smooth scrolling — important
Use a **manual `requestAnimationFrame` tween**, not `scrollTo({behavior:'smooth'})`
(native smooth-scroll proved unreliable in the prototype runtime; a manual tween is bulletproof
across browsers and respects a clamped max scroll). Reference implementation:

```js
let raf;
function tweenScroll(target) {
  if (raf) cancelAnimationFrame(raf);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const to = Math.max(0, Math.min(target, max));
  const from = window.scrollY;
  const dist = to - from;
  if (Math.abs(dist) < 2) { window.scrollTo(0, to); return; }
  const dur = Math.min(700, Math.max(300, Math.abs(dist) * 0.5));
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const e = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; // easeInOutQuad
    window.scrollTo(0, from + dist * e);
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}
// jump to a section element:
function jumpTo(sectionEl) {
  const top = sectionEl.getBoundingClientRect().top + window.scrollY - 12;
  tweenScroll(top);
}
```
Optionally guard with `matchMedia('(prefers-reduced-motion: reduce)')` → jump instantly.

### Text size (optional nicety)
The prototype exposes a text-scale preference (Comfortable 20px / Large 23px / Extra large 26px)
applied as the wrapper's base `font-size` (everything else is `em`). If you want a settings control,
set `document.querySelector('#app-wrapper').style.fontSize` and persist the choice in `localStorage`.
Default 20px.

---

## State management
- **Lord's Prayer variant**: local variable, default `'traditional'`.
- **Active section**: derived from scroll position (scroll-spy); no persistence.
- **Menu open**: local boolean.
- **(Optional) text scale**: `localStorage` key of your choosing, default 20px.
- No progress state, no checkbox state (removed). If you want to migrate old users cleanly,
  you may delete the old `reunion-card-progress` localStorage key on first load.

## Design tokens

Light (default):
```
--paper:      #f4ecdd   /* page background          */
--paper-2:    #fbf6ec   /* cards, pills, menu        */
--ink:        #2b2721   /* body text                 */
--ink-soft:   #4d463b   /* scripture, prayer text    */
--muted:      #867c6c   /* labels, captions          */
--line:       #e4d9c5   /* hairline borders          */
--line-soft:  #eee5d5   /* faint dividers            */
--accent:     #9c3b2c   /* clay red — headings, active */
--accent-soft:#efe0d7   /* active tint / quiet rules */
--gold:       #a97f36   /* roman numerals, bullets, marks */
```
Accent alternatives offered as a preference in the prototype: `#3b6ea5` (blue),
`#4f6f52` (sage), `#6b4f8a` (plum). Optional.

Type:
```
Display / reading: 'Newsreader', Georgia, serif   (400, 500, 600; italics 400/500)
Labels / UI:       'Figtree', sans-serif           (400, 500, 600)
Base size: 20px (scales: 23px large, 26px extra). Body line-height 1.65; prayers 1.7.
```
Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
```
> For a fully offline PWA, self-host these two fonts (drop the `.woff2` files in `/fonts`,
> add `@font-face` rules, and add them to the service worker precache) instead of the CDN link.

Radii: pills `999px`; cards `.7em`; menu panel `.9em`; menu items `.55em`.
Shadows: medallion `0 0 0 1px var(--line), 0 14px 40px -18px rgba(60,40,20,.45)`;
menu trigger `0 10px 26px -12px rgba(60,40,20,.5)`; menu panel `0 18px 44px -20px rgba(60,40,20,.5)`.

## Assets
- `icons/CursilloCross.png` — the rainbow cross + circle-of-people logo (already in your repo,
  under `icons/`). Used in the cover medallion. Also your existing favicons / PWA icons are unchanged.
- No other new images. Glyphs used are Unicode: ℣ (U+2123), ℟ (U+211F), ✝ (U+271D), ↑, ↓.

## Files in this bundle
- `Reunion Card.dc.html` — the full design reference (look + all interaction logic). Open it in a
  browser to see and click the finished design. Treat its CSS values and JS logic as the source of
  truth; re-express them in your vanilla `styles.css` + `js/` files.
- `icons/CursilloCross.png` — copy of the logo used on the cover.
