"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// --- Меню бургер ---
(function () {
  var $body = document.querySelector('body');
  var $menu = $body.querySelector('.main-nav');
  var $buttonToggle = $menu.querySelector('.main-nav__toggle');

  var onButtonToggleClick = function onButtonToggleClick(evt) {
    evt.preventDefault();
    $menu.classList.toggle('main-nav--active');
    $body.classList.toggle('lock');
  };

  $buttonToggle.addEventListener('click', onButtonToggleClick);
})(); // --- Модальное окно ---


(function () {
  var modalLinks = document.querySelectorAll('.toggle-modal');
  var body = document.querySelector('body');
  var modalCloseIcon = document.querySelectorAll('.js-close-modal');
  var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var lockPadding = document.querySelectorAll('.lock-padding');
  var timeout = 400;
  var lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
  var unlock = true;

  var bodyLock = function bodyLock() {
    /* Для фикса фиксированной шапки */
    if (lockPadding.length > 0) {
      for (var index = 0; index < lockPadding.length; index++) {
        var el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  };

  var bodyUnLock = function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (var index = 0; index < lockPadding.length; index++) {
          var el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }

      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  };

  var modalClose = function modalClose(modalActive) {
    var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (unlock) {
      modalActive.classList.remove('modal--active');
      modalActive.removeEventListener('mousedown', onModalOutsideClick);
      document.removeEventListener('keydown', onModalEscPress);

      if (doUnlock) {
        bodyUnLock();
      }
    }
  };

  if (modalCloseIcon.length > 0) {
    var _loop = function _loop(index) {
      var el = modalCloseIcon[index];
      el.addEventListener('click', function (evt) {
        modalClose(el.closest('.modal'));
        evt.preventDefault();
      });
    };

    for (var index = 0; index < modalCloseIcon.length; index++) {
      _loop(index);
    }
  }

  var onModalEscPress = function onModalEscPress(evt) {
    if (evt.keyCode === 27 || evt.code === 'Escape') {
      var modalActive = document.querySelector('.modal.modal--active');
      modalClose(modalActive);
    }
  };

  var onModalOutsideClick = function onModalOutsideClick(evt) {
    if (!evt.target.closest('.modal__content')) {
      modalClose(evt.target.closest('.modal'));
    }
  };

  var onModalTabClick = function onModalTabClick(evt) {
    var isTabPressed = evt.key === 'Tab' || evt.keyCode === 9;
    var firstFocusableElement = this.querySelectorAll(focusableElements)[0];
    var focusableContent = this.querySelectorAll(focusableElements);
    var lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (!isTabPressed) {
      return;
    }

    if (evt.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        evt.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        evt.preventDefault();
      }
    }
  };

  var modalOpen = function modalOpen(curentModal) {
    var firstFocusableElement = curentModal.querySelectorAll(focusableElements)[0];

    if (curentModal && unlock) {
      var modalActive = document.querySelector('.modal.modal--active');

      if (modalActive) {
        modalClose(modalActive, false);
      } else {
        bodyLock();
      }

      curentModal.classList.add('modal--active');
      curentModal.addEventListener('mousedown', onModalOutsideClick);
      document.addEventListener('keydown', onModalEscPress);
      curentModal.addEventListener('keydown', onModalTabClick);
      setTimeout(function () {
        firstFocusableElement.focus();
        firstFocusableElement.blur();
      }, timeout);
    }
  };

  var onModalLinkClick = function onModalLinkClick(evt) {
    evt.preventDefault();
    var modalName = this.getAttribute('data-target');
    var curentModal = document.querySelector(modalName);
    modalOpen(curentModal);
  };

  if (modalLinks.length > 0) {
    for (var _index = 0; _index < modalLinks.length; _index++) {
      var modalLink = modalLinks[_index];
      modalLink.addEventListener('click', onModalLinkClick);
    }
  }
})(); // --- Табы ---


(function () {
  var tabs = document.querySelectorAll('.tabs');
  tabs.forEach(function (tab) {
    var tabButtons = tab.querySelectorAll('.tabs-nav__btn');
    var tabItems = tab.querySelectorAll('.tabs-content__item');
    tabButtons.forEach(function (tabButton, index) {
      tabButton.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (!tabButton.classList.contains('tabs-nav__btn--active')) {
          tabButtons.forEach(function (tabButton, index) {
            tabButton.classList.remove('tabs-nav__btn--active');
            tabItems[index].classList.remove('tabs-content__item--active');
          });
          tabButton.classList.add('tabs-nav__btn--active');
          tabItems[index].classList.add('tabs-content__item--active');
        }
      });
    });
  });
})(); // --- Спойлеры ---


(function () {
  var slideUp = function slideUp(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('spollers-item__content--slide');
    }, duration);
  };

  var slideDown = function slideDown(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    target.style.removeProperty('display');
    var display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('spollers-item__content--slide');
    }, duration);
  };

  var slideToggle = function slideToggle(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('spollers-item__content--slide')) {
      target.classList.add('spollers-item__content--slide');
      window.getComputedStyle(target).display === 'none' ? slideDown(target, duration) : slideUp(target, duration);
    }
  };

  var spollers = document.querySelectorAll(".spoller");
  var canSlide = true;

  if (spollers.length > 0) {
    spollers.forEach(function (spoller) {
      spoller.addEventListener("click", function (evt) {
        evt.preventDefault();

        if (canSlide) {
          canSlide = false;

          if (spoller.closest('.spollers').classList.contains('spollers--one')) {
            var curentSpollers = spoller.closest('.spollers').querySelectorAll('.spoller');
            curentSpollers.forEach(function (curentSpoller) {
              if (curentSpoller !== spoller) {
                curentSpoller.classList.remove('spollers-item__btn--active');
                slideUp(curentSpoller.nextElementSibling);
              }
            });
          }

          spoller.classList.toggle('spollers-item__btn--active');
          slideToggle(spoller.nextElementSibling);
          setTimeout(function () {
            canSlide = true;
          }, 500);
        }
      });
    });
  }
})(); // --- Спойлеры ---


(function () {
  var forms = document.querySelectorAll('form');

  function form_submit(_x) {
    return _form_submit.apply(this, arguments);
  }

  function _form_submit() {
    _form_submit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt) {
      var btn, form, error, formAction, formMethod, message, ajax, formData, response, result, form_error;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              btn = evt.target;
              form = btn.closest('form');
              error = form_validate(form);

              if (!(error == 0)) {
                _context.next = 28;
                break;
              }

              formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
              formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
              message = form.getAttribute('data-message');
              ajax = form.getAttribute('data-ajax'); //SendForm

              if (!ajax) {
                _context.next = 26;
                break;
              }

              evt.preventDefault();
              formData = new FormData(form);
              form.classList.add('_sending');
              _context.next = 14;
              return fetch(formAction, {
                method: formMethod,
                body: formData
              });

            case 14:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 24;
                break;
              }

              _context.next = 18;
              return response.json();

            case 18:
              result = _context.sent;
              form.classList.remove('_sending');

              if (message) {
                popup_open('_' + message + '-message');
              }

              form_clean(form);
              _context.next = 26;
              break;

            case 24:
              alert("Ошибка");
              form.classList.remove('_sending');

            case 26:
              _context.next = 31;
              break;

            case 28:
              form_error = form.querySelectorAll('._error');

              if (form_error && form.classList.contains('_goto-error')) {
                _goto(form_error[0], 1000, 50);
              }

              evt.preventDefault();

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _form_submit.apply(this, arguments);
  }

  if (forms.length > 0) {
    forms.forEach(function (form) {
      form.addEventListener('submit', form_submit);
    });
  }

  function form_validate(form) {
    var error = 0;
    var form_req = form.querySelectorAll('._req');

    if (form_req.length > 0) {
      for (var index = 0; index < form_req.length; index++) {
        var el = form_req[index];

        if (!_is_hidden(el)) {
          error += form_validate_input(el);
        }
      }
    }

    return error;
  }

  function form_validate_input(input) {
    var error = 0;
    var input_g_value = input.getAttribute('data-value');

    if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
      if (input.value != input_g_value) {
        var em = input.value.replace(" ", "");
        input.value = em;
      }

      if (email_test(input) || input.value == input_g_value) {
        form_add_error(input);
        error++;
      } else {
        form_remove_error(input);
      }
    } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
      form_add_error(input);
      error++;
    } else {
      if (input.value == '' || input.value == input_g_value) {
        form_add_error(input);
        error++;
      } else {
        form_remove_error(input);
      }
    }

    return error;
  }

  function form_add_error(input) {
    input.classList.add('_error');
    input.parentElement.classList.add('_error');
    var input_error = input.parentElement.querySelector('.form__error');

    if (input_error) {
      input.parentElement.removeChild(input_error);
    }

    var input_error_text = input.getAttribute('data-error');

    if (input_error_text && input_error_text != '') {
      input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
    }
  }

  function form_remove_error(input) {
    input.classList.remove('_error');
    input.parentElement.classList.remove('_error');
    var input_error = input.parentElement.querySelector('.form__error');

    if (input_error) {
      input.parentElement.removeChild(input_error);
    }
  }

  function form_clean(form) {
    var inputs = form.querySelectorAll('input,textarea');

    for (var index = 0; index < inputs.length; index++) {
      var el = inputs[index];
      el.parentElement.classList.remove('_focus');
      el.classList.remove('_focus');
      el.value = el.getAttribute('data-value');
    }

    var checkboxes = form.querySelectorAll('.checkbox__input');

    if (checkboxes.length > 0) {
      for (var _index2 = 0; _index2 < checkboxes.length; _index2++) {
        var checkbox = checkboxes[_index2];
        checkbox.checked = false;
      }
    }

    var selects = form.querySelectorAll('select');

    if (selects.length > 0) {
      for (var _index3 = 0; _index3 < selects.length; _index3++) {
        var select = selects[_index3];
        var select_default_value = select.getAttribute('data-default');
        select.value = select_default_value;
        select_item(select);
      }
    }
  }
})();