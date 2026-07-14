import { sections } from './data.js';
import { renderSections } from './render.js';
import { initNav } from './nav.js';

document.getElementById('app').appendChild(renderSections(sections));
initNav(sections);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
