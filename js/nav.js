let animationFrame;

function tweenScroll(target) {
  const maximum = document.documentElement.scrollHeight - window.innerHeight;
  const destination = Math.max(0, Math.min(target, maximum));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, destination);
    return;
  }
  if (animationFrame) cancelAnimationFrame(animationFrame);
  const origin = window.scrollY;
  const distance = destination - origin;
  if (Math.abs(distance) < 2) return window.scrollTo(0, destination);
  const duration = Math.min(700, Math.max(300, Math.abs(distance) * 0.5));
  const start = performance.now();
  const step = (now) => {
    const time = Math.min(1, (now - start) / duration);
    const easing = time < 0.5 ? 2 * time * time : 1 - Math.pow(-2 * time + 2, 2) / 2;
    window.scrollTo(0, origin + distance * easing);
    if (time < 1) animationFrame = requestAnimationFrame(step);
  };
  animationFrame = requestAnimationFrame(step);
}

export function initNav(sections) {
  const menu = document.getElementById('jump-menu');
  const panel = document.createElement('div');
  panel.className = 'jump-panel';
  panel.id = 'jump-panel';
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'jump-trigger';
  trigger.setAttribute('aria-label', 'Open section menu');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', panel.id);
  trigger.innerHTML = '<span></span><span></span><span></span>';
  const items = new Map();
  const links = [{ id: 'top', numeral: '\u2191', label: 'Top' }, ...sections.map((section, index) => ({
    id: section.id, numeral: ['I', 'II', 'III', 'IV', 'V'][index], label: section.navLabel
  }))];

  function setOpen(open) {
    menu.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Close section menu' : 'Open section menu');
  }

  links.forEach(({ id, numeral, label }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.target = id;
    const number = document.createElement('span');
    number.className = 'jump-numeral';
    number.textContent = numeral;
    const text = document.createElement('span');
    text.textContent = label;
    button.append(number, text);
    button.addEventListener('click', () => {
      setOpen(false);
      const target = document.getElementById(id);
      tweenScroll(target.getBoundingClientRect().top + window.scrollY - (id === 'top' ? 0 : 12));
    });
    panel.appendChild(button);
    items.set(id, button);
  });

  trigger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  menu.append(panel, trigger);

  function updateActive() {
    const threshold = window.scrollY + window.innerHeight * 0.35;
    let active = 'top';
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element.offsetTop <= threshold) active = section.id;
    });
    items.forEach((button, id) => {
      const current = id === active;
      button.classList.toggle('active', current);
      if (current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();
}
