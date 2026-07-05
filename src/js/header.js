const menu = document.querySelector('[data-menu]');
const menuOpenButton = document.querySelector('[data-menu-open]');
const menuCloseButton = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('.mobile-menu__nav a');

function openMenu() {
  if (!menu || !menuOpenButton) return;

  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  menuOpenButton.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  if (!menu || !menuOpenButton) return;

  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  menuOpenButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuOpenButton?.addEventListener('click', openMenu);
menuCloseButton?.addEventListener('click', closeMenu);

menu?.addEventListener('click', event => {
  if (event.target === menu) {
    closeMenu();
  }
});

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});
