const menuToggle = document.querySelector(
  '.site-header__burger[data-action="open"]'
);
const menuClose = document.querySelector(
  '.mobile-menu__close[data-action="close"]'
);
const menu = document.querySelector('.mobile-menu[data-visible]');
const menuLinks = document.querySelectorAll('[data-menu-link]');
const hero = document.querySelector('[data-hero]');

function updateMenuHeight() {
  if (!menu || !hero) return;
  menu.style.setProperty('--hero-height', `${hero.offsetHeight}px`);
}

function openMenu() {
  if (!menu || !menuToggle) return;

  updateMenuHeight();
  menu.dataset.visible = 'open';
  menuToggle.dataset.expanded = 'true';
  menuToggle.setAttribute('aria-expanded', 'true');
  document.documentElement.dataset.scrollLock = '';
  document.body.dataset.scrollLock = '';
}

function closeMenu() {
  if (!menu || !menuToggle) return;

  menu.dataset.visible = 'close';
  menuToggle.dataset.expanded = 'false';
  menuToggle.setAttribute('aria-expanded', 'false');
  delete document.documentElement.dataset.scrollLock;
  delete document.body.dataset.scrollLock;
}

function toggleMenu() {
  if (!menu) return;
  const isOpen = menu.dataset.visible === 'open';
  isOpen ? closeMenu() : openMenu();
}

menuToggle?.addEventListener('click', toggleMenu);
menuClose?.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

document.addEventListener('click', event => {
  if (!menu || menu.dataset.visible !== 'open') return;

  const clickedInsideMenu = menu.contains(event.target);
  const clickedToggle = menuToggle?.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMenu();
  }
});

window.addEventListener('resize', updateMenuHeight);
window.addEventListener('load', updateMenuHeight);
