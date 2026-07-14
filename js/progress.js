// Group Reunion Card - progress state, backed by localStorage.

const STORAGE_KEY = 'reunion-card-progress';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getProgress() {
  return load();
}

export function setChecked(promptId, checked) {
  const state = load();
  if (checked) state[promptId] = true;
  else delete state[promptId];
  save(state);
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function computeStats(sections) {
  const checkedState = load();
  let total = 0;
  let checked = 0;

  const bySection = sections.map((section) => {
    const promptIds = section.blocks.filter((b) => b.type === 'prompt').map((b) => b.id);
    const sectionChecked = promptIds.filter((id) => checkedState[id]).length;
    total += promptIds.length;
    checked += sectionChecked;
    return { id: section.id, total: promptIds.length, checked: sectionChecked };
  });

  return { total, checked, sections: bySection };
}
