// --- Меню бургер ---
(function () {
    const $body = document.querySelector('body');
    const $menu = $body.querySelector('.main-nav');
    const $buttonToggle = $menu.querySelector('.main-nav__toggle');

    const onButtonToggleClick = function(evt) {
        evt.preventDefault();

        $menu.classList.toggle('main-nav--active');
        $body.classList.toggle('lock');
    }
    
    $buttonToggle.addEventListener('click', onButtonToggleClick);
})();

// --- Модальное окно ---
(function () {
    const modalToggles = document.querySelectorAll('.toggle-modal');
    const body = document.querySelector('body');
    // const modalCloseIcons = document.querySelectorAll('.js-close-modal');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const lockPadding = document.querySelectorAll('.lock-padding');
    const timeout = 400;
    let lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
    let unlock = true;

    const bodyLock = function () {
        /* Для фикса фиксированной шапки */
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    const bodyUnLock = function () {
        if (unlock) {
            setTimeout(function () {
                if (lockPadding.length > 0) {
                    for (let index = 0; index < lockPadding.length; index++) {
                        const el = lockPadding[index];
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
        }
    }

    const modalClose = function(modalActive, doUnlock = true) {
        const buttonCloseModal = modalActive.querySelector('.modal__btn-close');

        if (unlock) {

            if (doUnlock) {
                bodyUnLock();
            }

            if (modalActive.classList.contains('modal--video')) {
                modalActive.querySelector('.modal__video').innerHTML = '';
            }

            if (buttonCloseModal) {
                buttonCloseModal.removeEventListener('click', onButtonCloseModalClick);
            }

            modalActive.classList.remove('modal--active');
            modalActive.removeEventListener('mousedown', onModalOutsideClick);
            document.removeEventListener('keydown', onModalEscPress);
            modalActive.removeEventListener('keydown', onModalTabClick);
        }
    }

    const onButtonCloseModalClick = function(evt) {
        evt.preventDefault();
        modalClose(this.closest('.modal'));
    }

    const onModalEscPress = function (evt) {
        if (evt.keyCode === 27 || evt.code === 'Escape') {
            const modalActive = document.querySelector('.modal.modal--active');
            modalClose(modalActive);
        }
    }

    const onModalOutsideClick = function (evt) {
        if (!evt.target.closest('.modal__content')) {
            modalClose(this.closest('.modal'));
        }
    }

    const onModalTabClick = function (evt) {
        const isTabPressed = evt.key === 'Tab' || evt.keyCode === 9;
        const firstFocusableElement = this.querySelectorAll(focusableElements)[0];
        const focusableContent = this.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        if (!isTabPressed) {
            return;
        }

        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            evt.preventDefault();
        } else if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            evt.preventDefault();
        }
    }

    const modalOpen = function (curentModal, videoId = null) {
        const modalActive = document.querySelector('.modal.modal--active');
        const buttonCloseModal = curentModal.querySelector('.modal__btn-close');
        const firstFocusableElement = curentModal.querySelectorAll(focusableElements)[0];

        if (curentModal && unlock) {

            if (videoId) {
                const videoWrapper = curentModal.querySelector('.modal__video');

                videoWrapper.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                        allow="autoplay; encrypted-media"
                        allowfullscreen>
                    </iframe>
                `;
            }

            if (modalActive) {
                modalClose(modalActive, false);
            } else {
                bodyLock();
            }

            if (buttonCloseModal) {
                buttonCloseModal.addEventListener('click', onButtonCloseModalClick);
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
    }

    const onModalToggleClick = function(evt) {
        evt.preventDefault();
        const modalName = this.getAttribute('data-target');
        const videoId = this.getAttribute('data-video');
        const curentModal = document.querySelector(modalName);
        modalOpen(curentModal, videoId);
    }

    modalToggles.forEach(modalToggle => {
        modalToggle.addEventListener('click', onModalToggleClick);
    });

    window.modal = { modalOpen: modalOpen }
})();

// --- Табы ---
(function () {
    const tabs = document.querySelectorAll('.tabs');

    tabs.forEach((tab) => {
        const tabButtons = tab.querySelectorAll('.tabs-nav__btn');
        const tabItems = tab.querySelectorAll('.tabs-content__item');

        tabButtons.forEach((tabButton, index) => {
            tabButton.addEventListener('click', function (evt) {
                evt.preventDefault();

                if (!tabButton.classList.contains('tabs-nav__btn--active')) {
                    tabButtons.forEach((tabButton, index) => {
                        tabButton.classList.remove('tabs-nav__btn--active');
                        tabItems[index].classList.remove('tabs-content__item--active');
                    });

                    tabButton.classList.add('tabs-nav__btn--active');
                    tabItems[index].classList.add('tabs-content__item--active');
                }

            });
        });

    });
})();

// --- Спойлеры ---
(function () {
    const slideUp = (target, duration = 500) => {
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
        window.setTimeout(() => {
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
    }

    const slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        const height = target.offsetHeight;
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
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('spollers-item__content--slide');
        }, duration);
    }

    const slideToggle = (target, duration = 500) => {
        if (!target.classList.contains('spollers-item__content--slide')) {
            target.classList.add('spollers-item__content--slide');
            window.getComputedStyle(target).display === 'none'
                ? slideDown(target, duration)
                : slideUp(target, duration);
        }
    }

    const spollers = document.querySelectorAll(".spoller");
    let canSlide = true;

    if (spollers.length > 0) {

        spollers.forEach(spoller => {
            spoller.addEventListener("click", function (evt) {
                evt.preventDefault();

                if (canSlide) {
                    canSlide = false;

                    if (spoller.closest('.spollers').classList.contains('spollers--one')) {
                        const curentSpollers = spoller.closest('.spollers').querySelectorAll('.spoller');

                        curentSpollers.forEach(curentSpoller => {
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
})();

// --- Формы ---
(function() {
    const forms = document.querySelectorAll('form');

    async function onFormSubmit(evt) {
        const btn = evt.target;
        const form = btn.closest('form');
        const errors = formValidate(form);

        if (!errors) {
            const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
            const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
            const ajax = form.getAttribute('data-ajax');

            const modalId = form.getAttribute('data-target');
            const modal = document.querySelector(modalId);

            if (ajax) {
                evt.preventDefault();

                const formData = new FormData(form);

                const response = await fetch(formAction, {
                    method: formMethod,
                    body: formData
                });

                if (response.ok) {
                    // const data = await response.json();
                    
                    if (modal) {
                        window.modal.modalOpen(modal);
                    }
                
                    form_clean(form);
                } else {
                    alert("Ошибка");
                }
            }
        } else {
            evt.preventDefault();

            const form_error = form.querySelectorAll('._error');

            if (form_error && form.classList.contains('_goto-error')) {
                _goto(form_error[0], 1000, 50);
            }
        }
    }

    forms.forEach(form => {
        form.addEventListener('submit', onFormSubmit);
    });

    function formValidate(form) {
        let error = 0;
        let form_req = form.querySelectorAll('._req');
        if (form_req.length > 0) {
            for (let index = 0; index < form_req.length; index++) {
                const el = form_req[index];
                if (!_is_hidden(el)) {
                    error += form_validate_input(el);
                }
            }
        }
        return error;
    }

    function form_validate_input(input) {
        let error = 0;
        let input_g_value = input.getAttribute('data-value');

        if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
            if (input.value != input_g_value) {
                let em = input.value.replace(" ", "");
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

        let input_error = input.parentElement.querySelector('.form__error');
        if (input_error) {
            input.parentElement.removeChild(input_error);
        }
        let input_error_text = input.getAttribute('data-error');
        if (input_error_text && input_error_text != '') {
            input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
        }
    }
    function form_remove_error(input) {
        input.classList.remove('_error');
        input.parentElement.classList.remove('_error');

        let input_error = input.parentElement.querySelector('.form__error');
        if (input_error) {
            input.parentElement.removeChild(input_error);
        }
    }
    function form_clean(form) {
        let inputs = form.querySelectorAll('input,textarea');
        for (let index = 0; index < inputs.length; index++) {
            const el = inputs[index];
            el.parentElement.classList.remove('_focus');
            el.classList.remove('_focus');
            el.value = el.getAttribute('data-value');
        }
        let checkboxes = form.querySelectorAll('.checkbox__input');
        if (checkboxes.length > 0) {
            for (let index = 0; index < checkboxes.length; index++) {
                const checkbox = checkboxes[index];
                checkbox.checked = false;
            }
        }
        let selects = form.querySelectorAll('select');
        if (selects.length > 0) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_default_value = select.getAttribute('data-default');
                select.value = select_default_value;
                select_item(select);
            }
        }
    }
})();