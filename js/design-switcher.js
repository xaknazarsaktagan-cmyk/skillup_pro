/* SkillUp Design Switcher for the dashboard build. Visual preference only. */
(() => {
  'use strict';

  const STORAGE_KEY = 'skillup.design-preference.v1';
  const DEFAULT_DESIGN = 'dark';
  const DESIGNS = {
    light: { name: 'Light', description: 'Светлый, чистый минимализм' },
    dark: { name: 'Dark', description: 'Тёмный modern IT' },
    modern: { name: 'Modern', description: 'Светлый фон и accent' },
    creative: { name: 'Creative', description: 'Креативный, но профессиональный' },
  };
  let currentDesign = DEFAULT_DESIGN;
  let isOpen = false;
  let switcher;

  const icon = (name, size = 18) => {
    const paths = {
      palette: '<path d="M12 3a9 9 0 0 0 0 18h1.25a1.75 1.75 0 0 0 1.71-2.12l-.1-.47a1.75 1.75 0 0 1 1.71-2.12H18a3 3 0 0 0 3-3 10 10 0 0 0-9-10Z"/><circle cx="7.5" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="11" r="1" fill="currentColor" stroke="none"/>',
      check: '<path d="m5 12 4.2 4.2L19 6.7"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
  };

  const read = () => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value && Object.hasOwn(DESIGNS, value) ? value : DEFAULT_DESIGN;
    } catch (_) { return DEFAULT_DESIGN; }
  };
  const write = value => { try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {} };

  const sync = () => {
    if (!switcher) return;
    switcher.querySelectorAll('[data-design-option]').forEach(option => {
      const selected = option.dataset.designOption === currentDesign;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    const current = switcher.querySelector('[data-current-design]');
    if (current) current.textContent = DESIGNS[currentDesign].name;
    const trigger = switcher.querySelector('[data-design-trigger]');
    if (trigger) trigger.setAttribute('aria-expanded', String(isOpen));
    switcher.classList.toggle('is-open', isOpen);
  };

  const apply = (design, persist = true) => {
    if (!Object.hasOwn(DESIGNS, design)) return;
    currentDesign = design;
    document.documentElement.dataset.design = design;
    document.documentElement.style.colorScheme = design === 'dark' ? 'dark' : 'light';
    if (persist) write(design);
    sync();
    window.dispatchEvent(new CustomEvent('skillup:designchange', { detail: { design } }));
  };

  const open = () => { isOpen = true; sync(); };
  const close = () => { isOpen = false; sync(); };

  const mount = () => {
    if (document.querySelector('[data-design-switcher]')) return;
    switcher = document.createElement('aside');
    switcher.className = 'design-switcher';
    switcher.dataset.designSwitcher = '';
    switcher.setAttribute('aria-label', 'Выбор дизайна');
    switcher.innerHTML = `
      <div class="design-popover" role="dialog" aria-label="Выберите дизайн">
        <div class="design-popover-head"><div><span class="design-eyebrow">INTERFACE STYLE</span><h2>Выберите дизайн</h2></div><button class="design-close" type="button" data-design-close aria-label="Закрыть">${icon('close', 17)}</button></div>
        <p class="design-popover-copy">Выбор сразу применяется ко всему сайту и сохраняется в этом браузере.</p>
        <div class="design-options" role="group" aria-label="Четыре готовых дизайна">
          ${Object.entries(DESIGNS).map(([key, design]) => `<button class="design-option" type="button" data-design-option="${key}" aria-pressed="false"><span class="design-preview preview-${key}" aria-hidden="true"><i></i><i></i><i></i></span><span class="design-option-copy"><b>${design.name}</b><small>${design.description}</small></span><span class="design-check">${icon('check', 16)}</span></button>`).join('')}
        </div>
      </div>
      <button class="design-trigger" type="button" data-design-trigger aria-expanded="false"><span class="design-trigger-icon">${icon('palette', 19)}</span><span class="design-trigger-copy"><small>Дизайн</small><b data-current-design>Dark</b></span></button>`;
    document.body.appendChild(switcher);
    sync();
  };

  document.addEventListener('click', event => {
    const option = event.target.closest('[data-design-option]');
    if (option) { apply(option.dataset.designOption); close(); return; }
    if (event.target.closest('[data-design-trigger]')) { isOpen ? close() : open(); return; }
    if (event.target.closest('[data-design-close]')) { close(); return; }
    if (isOpen && switcher && !switcher.contains(event.target) && !event.target.closest('[data-act="theme"]') && !event.target.closest('[data-design-trigger]')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen) { close(); switcher?.querySelector('[data-design-trigger]')?.focus(); }
  });
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY && Object.hasOwn(DESIGNS, event.newValue)) apply(event.newValue, false);
  });

  apply(read(), false);
  window.SkillUpDesign = Object.freeze({ get value() { return currentDesign; }, set: apply, open, close, options: Object.freeze(Object.keys(DESIGNS)) });
  if (typeof ACT !== 'undefined') ACT.theme = open;
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount, { once: true });
})();
