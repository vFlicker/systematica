new Swiper('.slider', {
  loop: true,

  navigation: {
    nextEl: '.slider-actions__next',
    prevEl: '.slider-actions__prev',
  },
  
  speed : 1500,

  autoplay: {
    delay: 1000,
  },

  allowTouchMove: false,

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

