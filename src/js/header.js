const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menuLinks = document.querySelectorAll('.mobile-menu__nav a');
const hero = document.querySelector('.hero'); // якщо секції з класом .hero немає — просто не спрацює, помилки не буде

/* -----------------------------------------------------------
   Висота меню = висота hero-секції (--hero-height у CSS).
   Якщо .hero відсутній у розмітці — застосується fallback
   692px, який вже прописаний у CSS.
   ----------------------------------------------------------- */
function updateMenuHeight() {
  if (!menu || !hero) return;
  menu.style.setProperty('--hero-height', `${hero.offsetHeight}px`);
}

function openMenu() {
  if (!menu || !menuToggle) return;

  updateMenuHeight();
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (!menu || !menuToggle) return;

  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  if (!menu) return;
  const isOpen = menu.classList.contains('is-open');
  isOpen ? closeMenu() : openMenu();
}

menuToggle?.addEventListener('click', toggleMenu);

/* Клік по пункту меню — закриває */
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* Escape — закриває */
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

/* Клік поза меню і поза кнопкою — закриває */
document.addEventListener('click', event => {
  if (!menu || !menu.classList.contains('is-open')) return;

  const clickedInsideMenu = menu.contains(event.target);
  const clickedToggle = menuToggle?.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMenu();
  }
});

/* Перерахунок висоти при зміні розміру вікна / орієнтації */
window.addEventListener('resize', updateMenuHeight);
window.addEventListener('load', updateMenuHeight);
