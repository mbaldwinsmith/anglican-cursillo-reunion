// Group Reunion Card - entry module.
import { sections } from './data.js';
import { renderSections } from './render.js';
import { initNav } from './nav.js';
import { getProgress, setChecked, resetProgress, computeStats } from './progress.js';

const app = document.getElementById('app');
app.appendChild(renderSections(sections));

initNav(sections);

const progressBarEl = document.getElementById('progress-bar');
const meter = document.createElement('progress');
const progressLabel = document.createElement('span');
progressLabel.id = 'progress-label';
const resetBtn = document.createElement('button');
resetBtn.type = 'button';
resetBtn.id = 'reset-progress';
resetBtn.textContent = 'Reset progress';
progressBarEl.append(meter, progressLabel, resetBtn);

function hydrateCheckboxes() {
  const state = getProgress();
  for (const checkbox of app.querySelectorAll('input[type="checkbox"][data-prompt-id]')) {
    checkbox.checked = Boolean(state[checkbox.dataset.promptId]);
  }
}

function refreshProgressUI() {
  const stats = computeStats(sections);

  meter.max = stats.total;
  meter.value = stats.checked;
  progressLabel.textContent = `${stats.checked} / ${stats.total} completed`;

  for (const sectionStats of stats.sections) {
    const badge = document.querySelector(`.nav-badge[data-badge-for="${sectionStats.id}"]`);
    if (badge) {
      badge.textContent = sectionStats.total ? ` (${sectionStats.checked}/${sectionStats.total})` : '';
    }
  }
}

// Hydration happens synchronously before the browser's first paint, so there's no flash.
hydrateCheckboxes();
refreshProgressUI();

app.addEventListener('change', (event) => {
  const checkbox = event.target;
  if (!(checkbox instanceof HTMLInputElement)) return;
  if (checkbox.type !== 'checkbox' || !checkbox.dataset.promptId) return;

  setChecked(checkbox.dataset.promptId, checkbox.checked);
  refreshProgressUI();
});

resetBtn.addEventListener('click', () => {
  if (!confirm('Reset all progress for this reunion card? This cannot be undone.')) return;
  resetProgress();
  hydrateCheckboxes();
  refreshProgressUI();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
