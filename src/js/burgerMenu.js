const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menu = document.querySelector('[data-menu]');

function openMenu() {
  menu.classList.add('is-open');
  document.body.classList.add('menu-open');
  menu.setAttribute('aria-hidden', 'false');
  openBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menu.setAttribute('aria-hidden', 'true');
  openBtn.setAttribute('aria-expanded', 'false');
}

openBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

menu.addEventListener('click', e => {
  if (e.target === menu) closeMenu();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});
