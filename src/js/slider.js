import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const gallerySlider = document.querySelector('[data-gallery-slider]');
const prevButton = document.querySelector('[data-gallery-prev]');
const nextButton = document.querySelector('[data-gallery-next]');

if (gallerySlider) {
  const desktopQuery = window.matchMedia('(min-width: 1440px)');

  const wrapper = gallerySlider.querySelector('[data-swiper-wrapper]');
  const originalSlides = Array.from(wrapper.children);
  originalSlides.forEach(slide => wrapper.appendChild(slide.cloneNode(true)));
  originalSlides.forEach(slide => wrapper.appendChild(slide.cloneNode(true)));

  const swiper = new Swiper(gallerySlider, {
    modules: [Navigation],
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 24,
    slidesOffsetBefore: 56,
    slidesOffsetAfter: 56,
    grabCursor: true,
    watchSlidesProgress: true,
    loop: true,
    loopAdditionalSlides: 10,
    observer: true,
    observeParents: true,

    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },

    breakpoints: {
      1440: {
        spaceBetween: 38,
        slidesPerView: 3, // фіксоване число — вимога до кількості слайдів стає точною: 3+1+1=5
        slidesOffsetBefore: 120,
        slidesOffsetAfter: 120,
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

  window.__swiper = swiper; // тимчасово, для дебагу — можна прибрати пізніше

  window.addEventListener('resize', () => applyEdgeBlur(swiper));

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
