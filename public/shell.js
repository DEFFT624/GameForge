const body = document.body;
const learning = body.classList.contains('learning-page');
const make = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};
let sidebar = document.querySelector('aside');
if (!sidebar) {
  sidebar = make('aside');
  const brand = make('a', 'brand', '◈ GAMEFORGE');
  brand.href = '/home.html';
  sidebar.append(brand, make('p', 'tiny', 'LEARN AT YOUR PACE'));
  const nav = make('nav');
  nav.id = 'workspace-nav';
  nav.setAttribute('aria-label', 'Main');
  for (const [label, href] of [['Home','/home.html'],['First steps','/learn.html#start-here'],['Overview','/learn.html#dashboard'],['C# lessons','/learn.html#lessons'],['Build a tiny RPG','/learn.html#capstone'],['Community snippets','/learn.html#community']]) {
    const link = make('a', '', label); link.href = href; nav.append(link);
  }
  sidebar.append(nav);
  const skip = document.querySelector('.skip-link');
  if (skip) skip.after(sidebar); else body.prepend(sidebar);
}
sidebar.classList.add('site-sidebar');
sidebar.id = 'site-sidebar';
const nav = sidebar.querySelector('nav');
const character = make('a', '', 'My character');
character.href = '/character.html';
nav.append(character);
const icons = {'/home.html':'H', '#start-here':'>', '#dashboard':'=', '#lessons':'C#', '#capstone':'/', '#community':'{}', '/character.html':'@'};
for (const link of nav.querySelectorAll('a')) {
  const label = link.textContent;
  const destination = new URL(link.href);
  const icon = make('span', 'nav-icon', icons[destination.hash || destination.pathname] || '>');
  icon.setAttribute('aria-hidden', 'true');
  link.replaceChildren(icon, make('span', 'nav-label', label));
  link.title = label;
  link.setAttribute('aria-label', label);
  const home = ['/', '/home.html', '/index.html'].includes(location.pathname);
  if (!learning && (new URL(link.href).pathname === location.pathname || home && label === 'Home')) link.setAttribute('aria-current', 'page');
}
const toggle = make('button', 'sidebar-toggle');
toggle.id = 'sidebar-toggle';
toggle.type = 'button';
toggle.setAttribute('aria-controls', 'site-sidebar');
sidebar.prepend(toggle);
const key = 'gameforge-sidebar-collapsed';
const narrow = () => window.matchMedia('(max-width: 700px)').matches;
const defaultCollapsed = () => !learning || narrow();
let collapsed = defaultCollapsed();
try { const value = localStorage.getItem(key); if (value === 'true' || value === 'false') collapsed = value === 'true'; } catch {}
function render() {
  body.classList.add('has-sidebar');
  body.classList.toggle('sidebar-collapsed', collapsed);
  toggle.textContent = collapsed ? '»' : '«';
  toggle.setAttribute('aria-label', collapsed ? 'Open sidebar' : 'Collapse sidebar');
  toggle.title = collapsed ? 'Open sidebar' : 'Collapse sidebar';
  toggle.setAttribute('aria-expanded', String(!collapsed));
}
function setCollapsed(value) {
  collapsed = value;
  render();
  try { localStorage.setItem(key, String(value)); } catch {}
}
toggle.addEventListener('click', () => setCollapsed(!collapsed));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && (narrow() || sidebar.contains(document.activeElement)) && !collapsed) {
    setCollapsed(true); toggle.focus();
  }
});
nav.addEventListener('click', event => {
  if (narrow() && event.target.closest('a')) setCollapsed(true);
});
document.addEventListener('click', event => {
  if (narrow() && !collapsed && !sidebar.contains(event.target)) setCollapsed(true);
});
window.addEventListener('storage', event => {
  if (event.key === key || event.key === null) {
    try {
      const value = localStorage.getItem(key);
      collapsed = value === 'true' || value === 'false' ? value === 'true' : defaultCollapsed();
      render();
    } catch {}
  }
});
render();
