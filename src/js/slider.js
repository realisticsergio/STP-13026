import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const gallerySlider = document.querySelector('[data-gallery-slider]');
const prevButton = document.querySelector('[data-gallery-prev]');
const nextButton = document.querySelector('[data-gallery-next]');

if (gallerySlider) {
  const desktopQuery = window.matchMedia('(min-width: 1440px)');

  const swiper = new Swiper(gallerySlider, {
    modules: [Navigation], // без цього navigation.nextEl/prevEl ігнорується повністю
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 12, // мобільний gap — ТОЧНЕ значення ще не звірене з Figma
    grabCursor: true,
    watchSlidesProgress: true,

    navigation: {
      nextEl: nextButton, // реальні елементи, не рядкові селектори —
      prevEl: prevButton, // Swiper інакше шукає ЛИШЕ всередині свого контейнера
    },

    breakpoints: {
      1440: {
        spaceBetween: 38, // з Figma-специфікації
      },
    },

    on: {
      progress(swiperInstance) {
        applyEdgeBlur(swiperInstance);
      },
      setTransition(swiperInstance, duration) {
        swiperInstance.slides.forEach(slideEl => {
          slideEl.style.transitionDuration = `${duration}ms`;
        });
      },
    },
  });

  window.addEventListener('resize', () => applyEdgeBlur(swiper));

  /* -----------------------------------------------------------
     Swiper дає slide.progress: 0 у активного слайду,
     ±1 у безпосереднього сусіда, і далі зростає з відстанню.

     Мобілка: чіткий ТІЛЬКИ активний (поріг розмиття = 0)
       — тобто вже безпосередні сусіди (progress ±1) розмиті.
     Десктоп (1440+): чіткі активний + обидва сусіди
       (поріг розмиття = 1) — розмиті лише ті, що ДАЛІ сусідів.
     ----------------------------------------------------------- */
  function applyEdgeBlur(swiperInstance) {
    const blurThreshold = desktopQuery.matches ? 1 : 0;

    swiperInstance.slides.forEach(slideEl => {
      const distance = Math.abs(slideEl.progress);
      const beyond = distance - blurThreshold;

      const blur = beyond > 0 ? Math.min(beyond * 3, 3) : 0;
      const opacity = beyond > 0 ? Math.max(1 - beyond * 0.3, 0.6) : 1;

      slideEl.style.filter = blur ? `blur(${blur}px)` : '';
      slideEl.style.opacity = String(opacity);
    });
  }
}
