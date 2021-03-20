new Swiper('.slider', {
  loop: true,

  navigation: {
    nextEl: '.slider-actions__next',
    prevEl: '.slider-actions__prev',
  },
  
  speed : 1700,

  autoplay: {
    delay: 5000,
  },

  allowTouchMove: false,

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

// (function() {
//   document.addEventListener('contextmenu', (evt) => evt.preventDefault());
// })();