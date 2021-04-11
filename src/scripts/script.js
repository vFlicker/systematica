(function() {
  // Don't play audio if element has class swiper-button-disabled or page-footer__button--active

  const audio = new Audio('../audio-click.wav');
  const buttons = document.querySelectorAll('a');

  const onButtonClick = (evt) => {
    if ( !(evt.target.classList.contains('swiper-button-disabled')) && !(evt.currentTarget.classList.contains('page-footer__button--active'))) {
      audio.play();
    }
  };

  buttons.forEach((button) => button.addEventListener('click', onButtonClick))
})();

(function() {
  // Swiper slider settings

  new Swiper('.slider', {
    loop: false,

    navigation: {
      nextEl: '.slider-actions__next',
      prevEl: '.slider-actions__prev',
    },

    speed : 1700,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },

    allowTouchMove: false,

    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });
})();

// (function() {
//   // Disable mouse right click
//   document.addEventListener('contextmenu', (evt) => evt.preventDefault());
// })();

(function() {
  // Change language

  const data = {
    titles: {
      ua: [
        `ua_computers`,
        `ua_accessories`,
        `ua_peripher`,
        `ua_network`,
        `ua_office`,
        `ua_tel`,
      ],
      ru: [
        `ru_computers`,
        `ru_accessories`,
        `ru_peripher`,
        `ru_network`,
        `ru_office`,
        `ru_tel`,
      ],
      en: [
        `en_computers`,
        `en_accessories`,
        `en_peripher`,
        `en_network`,
        `en_office`,
        `en_tel`,
        ]
    },
    descritions: {
      ua: [
        `Персональні комп'ютери, робочі станції, десктопи, неттопи, моноблоки, ноутбуки, планшети, ліцензійне програмне забезпечення`,
        `Процесори, материнські плати, модулі пам'яті, відеокарти, внутрішні накопичувачі інформації, оптичні приводи, блоки живлення, системи охолодження, корпуса`,
        `Монітори, рідкокристалічні панелі, джерела безперебійного живлення, акумуляторні батареї, зовнішні накопичувачі інформації, клавіатури, миші, веб-камери, гарнітури, акустичні системи`,
        `Сервери, мережеві сховища NAS, маршрутизатори, комутатори, модеми, медиаконвертери, патч-панелі, кабельно-провідникова продукція, монтажні шафи та стійки`,
        `Принтери, сканери, багатофункціональні пристрої, плоттери, чекові принтери, шредери, ламінатори, проектори, проекційні екрани, витратні матеріали`,
        `Телефони стаціонарного зв'язку, факси, конференц-системи, міні-АТС, смартфони, мобільні телефони, відеокамери, відеореєстратори, фотоапарати, системи відеоспостереження та оповіщення`,
      ],
      ru: [
        `Персональные компьютеры, рабочие станции, десктопы, неттопы, моноблоки, ноутбуки, планшеты, лицензионное программное обеспечение`,
        `Процессоры, материнские платы, модули памяти, видеокарты, внутренние накопители информации, оптические приводы, блоки питания, системы охлаждения, корпуса`,
        `Мониторы, жидкокристаллические панели, источники бесперебойного питания, аккумуляторные батареи, внешние накопители информации, клавиатуры, мыши, веб-камеры, гарнитуры, акустические системы`,
        `Серверы, сетевые хранилища NAS, маршрутизаторы, коммутаторы, модемы, медиаконвертеры, патч-панели, кабельно-проводниковая продукция, монтажные шкафы и стойк`,
        `Принтеры, сканеры, многофункциональные устройства, плоттеры, чековые принтеры, шредеры, ламинаторы, проекторы, проекционные экраны, расходные материалы `,
        `Телефоны стационарной связи, факсы, конференц-системы, мини-АТС, смартфоны, мобильные телефоны, видеокамеры, видеорегистраторы, фотоаппараты, системы видеонаблюдения и оповещения`,
      ],
      en: [
        `Personal computers, workstations, desktops, nettops, monoblocks, laptops, tablets, licensed software`,
        `Processors, motherboards, memory modules, video cards, internal storage devices, optical drives, power supplies, cooling systems, cases`,
        `Monitors, LCD panels, uninterruptible power supplies, rechargeable batteries, external storage devices, keyboards, mice, webcams, headsets, speaker systems`,
        `Servers, NAS, routers, switches, modems, media converters, patch panels, cabling products, enclosures and racks`,
        `Printers, scanners, multifunctional devices, plotters, receipt printers, shredders, laminators, projectors, projection screens, consumables`,
        `Fixed telephones, faxes, conference systems, mini-automatic telephone exchanges, smartphones, mobile phones, video cameras, video recorders, cameras, video surveillance and notification systems`,
      ]
    },
    message: {
      ua: `Написати нам`,
      ru: `Написать нам`,
      en: `Write to us`
    },
    download: {
      ua: `Завантажити каталог`,
      ru: `Скачать каталог`,
      en: `Download catalog`
    }
  }

  const body = document.querySelector('body');
  const textMessage = body.querySelector('.button__write-us-1');
  const textDownload = body.querySelector('.button__download-text');
  const langButtons = body.querySelectorAll('.page-footer__button');
  const slider = body.querySelector('.slider');
  const titles = slider.querySelectorAll('.slider-content__img-title');
  const descriptions = slider.querySelectorAll('.slider-content__descr');

  const changeActiveButton = (evt) => {
    langButtons.forEach((langButton) => langButton.classList.remove('page-footer__button--active'));
    evt.currentTarget.classList.add('page-footer__button--active');
  };

  const addClassOnBody = (lang) => {
    body.className = lang;
  };

  const changeLanguage = (lang) => {
    const path = 'images/sprite.svg#';

    textMessage.textContent = data.message[lang];
    textDownload.textContent = data.download[lang];

    descriptions.forEach((description, index) => description.textContent = data.descritions[lang][index]);

    titles.forEach((title, index) => {
      title
        .querySelector('use')
        .setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${path}${data.titles[lang][index]}`);
    });
  };

  const onLangButtonClick = (evt) => {
    const lang = evt.currentTarget.getAttribute("href").slice(1);

    changeActiveButton(evt);
    addClassOnBody(lang);
    changeLanguage(lang);
  }

  langButtons.forEach((langButton) => langButton.addEventListener('click', onLangButtonClick));

})();
