import './js/burgerMenu';
import './js/header';
import './js/faq';
import './js/slider';
import './js/scroll';
import './css/styles.css';

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
});
