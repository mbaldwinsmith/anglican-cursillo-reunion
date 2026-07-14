function renderScripture(block) {
  const quote = document.createElement('blockquote');
  quote.className = 'scripture';
  const text = document.createElement('p');
  text.textContent = `\u201c${block.text}\u201d`;
  const footer = document.createElement('footer');
  footer.textContent = block.ref;
  quote.append(text, footer);
  return quote;
}

function renderParagraph(block) {
  const p = document.createElement('p');
  p.textContent = block.text;
  return p;
}

function renderVersicles(block) {
  const card = document.createElement('div');
  card.className = 'versicles';
  block.lines.forEach((line, index) => {
    const row = document.createElement('p');
    row.className = 'versicle';
    const mark = document.createElement('span');
    mark.className = 'versicle-mark';
    mark.textContent = index ? '\u211f' : '\u2123';
    const text = document.createElement('span');
    text.textContent = line;
    row.append(mark, text);
    card.appendChild(row);
  });
  return card;
}

function renderLordsPrayer(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'lords-prayer';
  const header = document.createElement('div');
  header.className = 'lords-prayer-header';
  const heading = document.createElement('h3');
  heading.textContent = "The Lord's Prayer";
  const rule = document.createElement('span');
  rule.className = 'lords-prayer-rule';
  const toggle = document.createElement('div');
  toggle.className = 'prayer-toggle';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', 'Lord\'s Prayer form');
  const prayer = document.createElement('p');
  prayer.className = 'prayer-text';

  const variants = [['traditional', 'Traditional'], ['contemporary', 'Contemporary']];
  variants.forEach(([key, label], index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.classList.toggle('active', index === 0);
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      prayer.textContent = block[key];
      toggle.querySelectorAll('button').forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    });
    toggle.appendChild(button);
  });
  prayer.textContent = block.traditional;
  header.append(heading, rule, toggle);
  wrapper.append(header, prayer);
  return wrapper;
}

function renderHeading(block) {
  const heading = document.createElement('h3');
  heading.className = 'sub-heading';
  heading.textContent = block.text;
  return heading;
}

function renderPrompt(block) {
  const prompt = document.createElement('p');
  prompt.className = 'prompt';
  const suffix = block.text.match(/\s*(For example(?::|, through:)?)$/i);
  if (suffix) {
    prompt.textContent = block.text.slice(0, suffix.index).trim();
    const label = document.createElement('span');
    label.className = 'example-label';
    label.textContent = suffix[1];
    const group = document.createDocumentFragment();
    group.append(prompt, label);
    return group;
  }
  prompt.textContent = block.text;
  return prompt;
}

function renderTable(block) {
  const pills = document.createElement('div');
  pills.className = 'example-pills';
  block.rows.flat().forEach((item) => {
    const pill = document.createElement('span');
    pill.textContent = item.replace('/', ' / ');
    pills.appendChild(pill);
  });
  return pills;
}

function renderList(block) {
  const list = document.createElement('ul');
  block.items.forEach((item) => {
    const li = document.createElement('li');
    const bullet = document.createElement('span');
    bullet.setAttribute('aria-hidden', 'true');
    bullet.textContent = '\u2022';
    const text = document.createElement('span');
    text.textContent = item;
    li.append(bullet, text);
    list.appendChild(li);
  });
  return list;
}

const renderers = { scripture: renderScripture, paragraph: renderParagraph, versicles: renderVersicles,
  lordsPrayer: renderLordsPrayer, heading: renderHeading, prompt: renderPrompt, table: renderTable, list: renderList };

export function renderSection(section, index) {
  const element = document.createElement('section');
  element.id = section.id;
  element.className = 'card-section';
  element.setAttribute('aria-labelledby', `${section.id}-title`);
  const header = document.createElement('div');
  header.className = 'section-header';
  const numeral = document.createElement('span');
  numeral.className = 'section-numeral';
  numeral.textContent = ['I', 'II', 'III', 'IV', 'V'][index];
  const title = document.createElement('h2');
  title.id = `${section.id}-title`;
  title.textContent = section.title;
  header.append(numeral, title);
  element.appendChild(header);

  let promptsUnderHeading = 0;
  section.blocks.forEach((block, blockIndex) => {
    if (block.type === 'heading') promptsUnderHeading = 0;
    const rendered = renderers[block.type](block);
    if (block.type === 'prompt') {
      promptsUnderHeading += 1;
      if (promptsUnderHeading > 1) rendered.querySelector?.('.prompt')?.classList.add('prompt-accent');
      if (rendered instanceof HTMLParagraphElement && promptsUnderHeading > 1) rendered.classList.add('prompt-accent');
    }
    if (section.id === 'closing' && blockIndex === section.blocks.length - 1) rendered.classList.add('thanksgiving');
    element.appendChild(rendered);
  });
  return element;
}

export function renderSections(sections) {
  const fragment = document.createDocumentFragment();
  sections.forEach((section, index) => fragment.appendChild(renderSection(section, index)));
  return fragment;
}
