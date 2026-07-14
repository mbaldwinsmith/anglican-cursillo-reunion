# Anglican Cursillo Group Reunion Card

A warm, distraction-free digital version of the Anglican Cursillo Group Reunion Card. The progressive web app guides a reunion group through Opening, Piety, Study, Apostolic Action, and Closing in one continuous reading experience.

**[Open the Group Reunion Card](https://mbaldwinsmith.github.io/anglican-cursillo-reunion/)**

## Features

- One quiet, continuous-scroll page designed for following along on a phone or tablet
- Complete Group Reunion Card content, including scripture, prompts, prayers, and examples
- Traditional and contemporary forms of the Lord's Prayer
- Floating section menu with scroll-position highlighting
- Responsive, accessible interface with reduced-motion support
- Installable PWA with an offline-cached application shell
- No accounts, progress tracking, analytics, framework, or build step

## Using the card

Open the hosted app in a modern browser and scroll through the reunion together. Use the menu in the bottom-right corner to jump directly to a section. In the Opening section, use the toggle beside the Lord's Prayer to choose the traditional or contemporary form.

To install it, use your browser's **Install app** or **Add to Home Screen** option. Visit the app online once before relying on offline access so the application files can be cached. The reading fonts are bundled with the app and remain available offline.

## Local development

The project is plain HTML, CSS, and JavaScript, so there are no dependencies to install or assets to build. Service workers require an HTTP origin, so serve the directory locally instead of opening `index.html` directly.

For example, with Python:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Project structure

```text
index.html              Page shell and cover
css/styles.css          Typography, layout, and component styles
js/data.js              Group Reunion Card content model
js/render.js            DOM rendering and prayer toggle
js/nav.js               Jump menu, scroll-spy, and animated scrolling
js/app.js               Application entry point
sw.js                   Offline application-shell cache
manifest.webmanifest    PWA metadata and icons
icons/                  Cursillo artwork and application icons
images/                 Social sharing artwork
fonts/                  Self-hosted reading fonts and their licences
```

When changing an application-shell file, increment `CACHE_VERSION` in `sw.js` so existing installations receive the update.

## Content acknowledgement

Group Reunion Card content &copy; British Anglican Cursillo Council 2003. Anglican Cursillo&reg; is registered at the U.S. Patent Office.
