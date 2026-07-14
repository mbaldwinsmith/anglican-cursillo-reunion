// Group Reunion Card - turns data.js section objects into DOM fragments.

function renderScripture(block) {
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'scripture';

  const p = document.createElement('p');
  p.textContent = block.text;
  blockquote.appendChild(p);

  const footer = document.createElement('footer');
  const cite = document.createElement('cite');
  cite.textContent = block.ref;
  footer.append('— ', cite);
  blockquote.appendChild(footer);

  return blockquote;
}

function renderParagraph(block) {
  const p = document.createElement('p');
  p.textContent = block.text;
  return p;
}

function renderVersicles(block) {
  const div = document.createElement('div');
  div.className = 'versicles';
  for (const line of block.lines) {
    const p = document.createElement('p');
    p.className = 'versicle';
    p.textContent = line;
    div.appendChild(p);
  }
  return div;
}

function renderLordsPrayerVariant(summaryText, bodyText) {
  const details = document.createElement('details');
  details.className = 'lords-prayer-variant';

  const summary = document.createElement('summary');
  summary.textContent = summaryText;
  details.appendChild(summary);

  const p = document.createElement('p');
  p.textContent = bodyText;
  details.appendChild(p);

  return details;
}

function renderLordsPrayer(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'lords-prayer';

  const heading = document.createElement('p');
  heading.className = 'lords-prayer-label';
  heading.textContent = 'Our Father, ….';
  wrapper.appendChild(heading);

  wrapper.appendChild(renderLordsPrayerVariant('Traditional', block.traditional));
  wrapper.appendChild(renderLordsPrayerVariant('Contemporary', block.contemporary));

  return wrapper;
}

function renderHeading(block) {
  const h3 = document.createElement('h3');
  h3.textContent = block.text;
  return h3;
}

function renderPrompt(block) {
  const div = document.createElement('div');
  div.className = 'prompt';

  const label = document.createElement('label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `prompt-${block.id}`;
  checkbox.dataset.promptId = block.id;

  const span = document.createElement('span');
  span.textContent = block.text;

  label.append(checkbox, span);
  div.appendChild(label);

  return div;
}

function renderTable(block) {
  const table = document.createElement('table');
  table.className = 'example-table';

  const tbody = document.createElement('tbody');
  for (const [a, b] of block.rows) {
    const tr = document.createElement('tr');
    const tdA = document.createElement('td');
    tdA.textContent = a;
    const tdB = document.createElement('td');
    tdB.textContent = b;
    tr.append(tdA, tdB);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  return table;
}

function renderList(block) {
  const ul = document.createElement('ul');
  for (const item of block.items) {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }
  return ul;
}

const BLOCK_RENDERERS = {
  scripture: renderScripture,
  paragraph: renderParagraph,
  versicles: renderVersicles,
  lordsPrayer: renderLordsPrayer,
  heading: renderHeading,
  prompt: renderPrompt,
  table: renderTable,
  list: renderList
};

function renderBlock(block) {
  const renderer = BLOCK_RENDERERS[block.type];
  if (!renderer) {
    throw new Error(`Unknown block type: ${block.type}`);
  }
  return renderer(block);
}

export function renderSection(section) {
  const el = document.createElement('section');
  el.id = section.id;
  el.className = 'card-section';
  el.setAttribute('aria-labelledby', `${section.id}-title`);
  el.hidden = true;

  const h2 = document.createElement('h2');
  h2.id = `${section.id}-title`;
  h2.textContent = section.title;
  el.appendChild(h2);

  for (const block of section.blocks) {
    el.appendChild(renderBlock(block));
  }

  return el;
}

export function renderSections(sections) {
  const fragment = document.createDocumentFragment();
  for (const section of sections) {
    fragment.appendChild(renderSection(section));
  }
  return fragment;
}
