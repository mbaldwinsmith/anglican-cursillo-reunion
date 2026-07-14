// Group Reunion Card - section nav, hash routing, prev/next, keyboard nav.

function sectionIndex(sections, id) {
  const idx = sections.findIndex((s) => s.id === id);
  return idx === -1 ? 0 : idx;
}

export function initNav(sections) {
  const navEl = document.getElementById('section-nav');
  const mainEl = document.getElementById('app');
  const prevBtn = document.getElementById('prev-section');
  const nextBtn = document.getElementById('next-section');

  const navButtons = new Map();
  for (const section of sections) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.sectionId = section.id;
    btn.addEventListener('click', () => {
      location.hash = section.id;
    });

    const label = document.createElement('span');
    label.className = 'nav-label';
    label.textContent = section.navLabel;

    const badge = document.createElement('span');
    badge.className = 'nav-badge';
    badge.dataset.badgeFor = section.id;

    btn.append(label, badge);
    navEl.appendChild(btn);
    navButtons.set(section.id, btn);
  }

  function showSection(id) {
    const idx = sectionIndex(sections, id);
    const section = sections[idx];

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) el.hidden = s.id !== section.id;
    }

    for (const [sid, btn] of navButtons) {
      if (sid === section.id) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    }

    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= sections.length - 1;

    document.title = `${section.title} – Group Reunion Card`;
  }

  function goTo(id) {
    if (location.hash.slice(1) === id) {
      showSection(id);
    } else {
      location.hash = id;
    }
  }

  function goToOffset(offset) {
    const idx = sectionIndex(sections, location.hash.slice(1));
    const nextIdx = idx + offset;
    if (nextIdx >= 0 && nextIdx < sections.length) {
      goTo(sections[nextIdx].id);
    }
  }

  window.addEventListener('hashchange', () => {
    showSection(location.hash.slice(1));
  });

  prevBtn.addEventListener('click', () => goToOffset(-1));
  nextBtn.addEventListener('click', () => goToOffset(1));

  mainEl.addEventListener('keydown', (event) => {
    if (event.target.matches('input, textarea, select')) return;
    if (event.key === 'ArrowLeft') goToOffset(-1);
    else if (event.key === 'ArrowRight') goToOffset(1);
  });

  const requestedId = location.hash.slice(1);
  const initialId = sections.some((s) => s.id === requestedId) ? requestedId : sections[0].id;
  if (location.hash.slice(1) !== initialId) {
    history.replaceState(null, '', `#${initialId}`);
  }
  showSection(initialId);
}
