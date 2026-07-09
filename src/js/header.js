const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menuLinks = document.querySelectorAll('[data-menu-link]');
const hero = document.querySelector('[data-hero]');

function updateMenuHeight() {
  if (!menu || !hero) return;
  menu.style.setProperty('--hero-height', `${hero.offsetHeight}px`);
}

function openMenu() {
  if (!menu || !menuToggle) return;

  updateMenuHeight();
  menu.setAttribute('data-open', '');
  menu.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.setAttribute('data-scroll-lock', '');
}

function closeMenu() {
  if (!menu || !menuToggle) return;

  menu.removeAttribute('data-open');
  menu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.removeAttribute('data-scroll-lock');
}

function toggleMenu() {
  if (!menu) return;
  const isOpen = menu.hasAttribute('data-open');
  isOpen ? closeMenu() : openMenu();
}

menuToggle?.addEventListener('click', toggleMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

document.addEventListener('click', event => {
  if (!menu || !menu.hasAttribute('data-open')) return;

  const clickedInsideMenu = menu.contains(event.target);
  const clickedToggle = menuToggle?.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMenu();
  }
});

window.addEventListener('resize', updateMenuHeight);
window.addEventListener('load', updateMenuHeight);
