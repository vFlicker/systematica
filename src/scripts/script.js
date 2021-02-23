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

// const button = document.querySelector('.slider-actions__next');
// button.addEventListener('click', function() {
//   var audio = new Audio('audio_file.mp3');
//   audio.play();
// });



