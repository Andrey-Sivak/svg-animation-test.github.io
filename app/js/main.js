'use strict';
import * as $ from 'jquery';
import './jquery.validate.min';
import './slick.min';

const mobileWidth = 767;
let isMobile = checkWidth();

window.addEventListener('resize', () => {
    isMobile = checkWidth();
});

setTimeout(() => {
    if (!document.querySelector('.loader')) {
        return;
    }

    const loader = document.querySelector('.loader');
    if (loader.classList.contains('active')) {
        loader.classList.remove('active');

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 300)
    }
}, 2500);

window.addEventListener('load', function () {

    (function mobMenu() {
        if (!document.querySelector('.mob-menu-btn')) {
            return;
        }

        const btn = document.querySelector('.mob-menu-btn');
        const menu = document.querySelector('.menu');
        const langs = document.querySelector('.header__langs');

        btn.addEventListener('click', function (e) {
            e.preventDefault();

            this.classList.toggle('active');
            menu.classList.toggle('active');
            langs.classList.toggle('active');
            document.body.classList.toggle('no-scrolling');
        });

        if (btn.classList.contains('hide')) {
            btn.classList.remove('hide');
        }
    })();

    (function loader() {
        if (!document.querySelector('.loader')) {
            return;
        }

        const loader = document.querySelector('.loader');

        if (loader.classList.contains('active')) {
            loader.classList.remove('active');
        }

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 1500);

    })();

    (function form() {
        if (!document.querySelector('.contact-section__block form')) {
            return;
        }

        const form = document.querySelector('.contact-section__block form');
        const textarea = form.querySelector('textarea');
        const budgetList = form.querySelector('.form__field.budget');
        const fileInput = form.querySelector('input[name="file1"]');

        textarea.addEventListener('input', textareaHandleInput);
        fileInput.addEventListener('change', handleFileInput);
        budgetList.addEventListener('click', selectBudget);

        function selectBudget(e) {
            const target = e.target;

            if(!target.classList.contains('budget__item') || target.classList.contains('active')) {
                return;
            }

            const budgetInput = budgetList.querySelector('input');
            const listWrap = budgetList.querySelector('.budget__wrap');

            if (listWrap.children.length) {
                document.querySelector('.budget__item.active')
                    .classList.remove('active');

                target.classList.add('active');
                budgetInput.value = target.innerHTML;
            }
        }
    })();

    (function firstSectionAnimation() {
        if (!document.getElementById('first-section-svg')) {
           return;
        }

        const options = {
            display: {
                elem: document.getElementById('display'),
                isAnimationEnd: true,
                animationDuration: 2000,
            },
            phone: {
                elem: document.getElementById('phone'),
                isAnimationEnd: true,
                animationDuration: 4000,
            },
            laptop: {
                elem: document.getElementById('laptop'),
                isAnimationEnd: true,
                animationDuration: 1000,
            },
        };

        for (const key in options) {

            const changeObserver = {
                set: function (target, prop, val) {

                    if (prop === 'isAnimationEnd' && val === false) {
                        proxy.prop = val;

                        const el = target.elem;
                        const isDisplay = el === document.getElementById('display');

                        el.removeEventListener('mouseover', hoverHandler);

                        if (isDisplay &&
                            el.parentElement.classList.contains('click') &&
                            !el.parentElement.classList.contains('unclick')) {

                            el.parentElement.classList.add('unclick');
                        }

                        el.parentElement.classList.add('click');

                        setTimeout(() => {
                                if (isDisplay && el.parentElement.classList.contains('unclick')) {
                                    el.parentElement.classList.remove('click', 'unclick');
                                } else if (!isDisplay) {
                                    el.parentElement.classList.remove('click');
                                }
                            proxy.isAnimationEnd = true;
                            el.addEventListener('mouseover', hoverHandler);
                        }, target.animationDuration);

                        return true;
                    }

                    target.prop = val;
                    return true;
                }
            };

            const proxy = new Proxy(options[key], changeObserver);

            proxy.elem.addEventListener('mouseover', hoverHandler);

            function hoverHandler() {
                if (!proxy.isAnimationEnd) {
                    return;
                }

                proxy.isAnimationEnd = false;
            }
        }
    })();

    (function processAnimation() {
        if (!document.getElementById('process-svg')) {
            return;
        }

        const processSection = document.querySelector('.process');
        const svg = document.getElementById('process-svg');
        const processTextItems = [...processSection.querySelectorAll('.third-section__item')];

        const processSectionTop = processSection.getBoundingClientRect().top - 100;

        const options = [
            {
                textElement: processTextItems[0],
                svgTargetElement: svg.querySelector('#process-design'),
                animationDuration: 3400,
            },
            {
                textElement: processTextItems[1],
                svgTargetElement: svg.querySelector('#process-phone'),
                animationDuration: 2000,
            },
            {
                textElement: processTextItems[2],
                svgTargetElement: svg.querySelector('#process-phone'),
                animationDuration: 2200,
            },
            {
                textElement: processTextItems[3],
                svgTargetElement: svg.querySelector('#process-phone'),
                animationDuration: 700,
            },
            {
                textElement: processTextItems[4],
                svgTargetElement: svg.querySelector('#process-marketing'),
                animationDuration: 1600,
            },
            {
                textElement: processTextItems[5],
                svgTargetElement: svg.querySelector('#process-launch'),
                animationDuration: 1000,
            },
        ];

        let currentAnimation = 0;
        let isAnimationEnd = true;


        processSection.addEventListener('wheel', function(e) {

            if (!isAnimationEnd) {
                e.preventDefault();
                return;
            }

            let wDelta = e.wheelDelta < 0 ? 'down' : 'up';

            if (window.pageYOffset > processSectionTop) {
                if (wDelta === 'down' && currentAnimation < options.length) {
                    e.preventDefault();
                    currentAnimation++;
                    animate(currentAnimation - 1, wDelta);
                } else if (wDelta === 'up' && currentAnimation) {
                    e.preventDefault();
                    currentAnimation--;
                    animate(currentAnimation, wDelta);
                }
            }
        });

        function animate(i, direction) {
            isAnimationEnd = false;
            const elem = options[i].textElement;
            const svg = options[i].svgTargetElement;

            if (direction === 'up') {
                if (svg.classList.contains('hide')) {
                    svg.classList.remove('hide');
                }

                svg.classList.add('unanimate');


                console.log(i === 3 || i === 4);
            } else {
                svg.classList.add('animate');

                if (i === 1 || i === 4 || i === 5) {
                    options[i - 1].svgTargetElement.classList.add('hide');
                }

                if (i === 2) {
                    svg.classList.add('animate2');
                }

                if (i === 3) {
                    svg.classList.add('animate3');
                }

                elem.classList.add('show');
            }

            document.body.classList.add('no-scrolling');

            setTimeout(() => {
                isAnimationEnd = true;

                if (direction === 'up') {

                    if (elem.nextElementSibling
                        && elem.nextElementSibling.classList.contains('show')) {

                        elem.nextElementSibling.classList.remove('show');
                    } else {
                        elem.classList.remove('show');
                    }


                    if (i === 1 || i === 5) {
                        svg.previousElementSibling.classList.remove('hide');
                        svg.classList = [];
                    }

                    if (i === 4) {
                        svg.previousElementSibling.classList.remove( 'hide');
                        svg.classList = [];
                    }

                    if (i === 3) {
                        svg.classList.remove('animate3');
                    }

                    if (i === 2) {
                        svg.classList.remove('animate2');
                    }

                    if (i === 0) {
                        svg.classList = [];
                    }
                }

                document.body.classList.remove('no-scrolling');
            }, options[i].animationDuration)
        }
    })();

    (function popup() {
        if (!document.querySelector('.popup')) {
            return;
        }

        const popup = document.querySelector('.popup');
        const popupBtns = [...document.querySelectorAll('.popup-show')];
        const form = document.querySelector('.popup form');
        const textarea = form.querySelector('textarea');
        const fileInput = form.querySelector('input[type="file"]');

        textarea.addEventListener('input', textareaHandleInput);
        fileInput.addEventListener('change', handleFileInput);

        popup.addEventListener('click', hidePopup);
        popupBtns.forEach(p => {
            p.addEventListener('click', showPopup);
        });

        function showPopup(e) {
            e.preventDefault();

            if (!popup.classList.contains('active')) {
                popup.classList.add('active');
                document.body.classList.add('no-scrolling');
            }
        }

        function hidePopup(e) {
            const target = e.target;

            if (target.dataset.close && popup.classList.contains('active')) {
                e.preventDefault();

                popup.classList.remove('active');
                document.body.classList.remove('no-scrolling');
            }
        }
    })();

    (function validate() {
        const form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    f_name: {
                        required: true,
                        f_name: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    message: {
                        required: true,
                    },
                    check: {
                        required: true,
                    },
                    popup_f_name: {
                        required: true,
                        f_name: true,
                    },
                    popup_email: {
                        required: true,
                        email: true,
                    },
                    popup_message: {
                        required: true,
                    },
                    popup_check: {
                        required: true,
                    },
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    const placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    f_name: 'Недопустимое значение',
                    popup_f_name: 'Недопустимое значение',
                    email: 'Некорректный e-mail',
                    popup_email: 'Некорректный e-mail'
                }
            })
        });

        $.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });

        $.validator.addMethod('f_name', function (value, element) {
            return this.optional(element) || /^[a-zа-яё]/i.test(value);
        });

    })();
    
    (function servicesAnimation() {
        if (!document.querySelector('.service-animate') || isMobile) {
            return;
        }

        const items = [...document.querySelectorAll('.service-animate')];
        const shines = [...document.querySelectorAll('.service-animate-shine')];
        const itemsCoords = {};

        items.forEach((item, i) => {
            item.addEventListener('mouseenter', (e) => {

                item.classList.add('active');
            });

            item.addEventListener('mouseleave', (e) => {
                item.classList.remove('active');
            });

            const rect = item.getBoundingClientRect();
            const itemX = rect.left + item.offsetWidth / 2 + pageXOffset;
            const itemY = rect.top + item.offsetHeight / 2 + pageYOffset;

                Object.defineProperty(itemsCoords, i, {
                value: {
                    x: itemX,
                    y: itemY,
                }
            })
        });

        document.addEventListener('mousemove', moveByMouse);

        function moveByMouse(e) {
            let mouseX = e.x + pageXOffset;
            let mouseY = e.y + pageYOffset;

            shines.forEach((shine, i) => {
                let x = mouseX - itemsCoords[i].x;
                let y = mouseY - itemsCoords[i].y;

                shine.style.transform = `rotate(${57.2958 * getArctctg(x, y)}deg) translateX(110px)`;
            })
        }
    })();

    (function servicesSlider() {
        if (!document.querySelector('.second-section__items')) {
            return;
        }

        const sliderSelector = '.second-section__items';

        if (document.body.offsetWidth < 800) {
            isMobile = true;
            initSlider(sliderSelector);
        }

        window.addEventListener('resize', function (e) {
            if (isMobile) {
                initSlider(sliderSelector);
            } else {
                destroySlider(sliderSelector);
            }
        });

        function initSlider(slider) {
            $(slider).slick({
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                slidesToShow: 1,
                swipeToSlide: true,
                prevArrow: '',
                nextArrow: '',
            })
        }

        function destroySlider(slider) {
            $(slider).slick('unslick');
        }
    })();

});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}

function textareaHandleInput() {
    if (this.scrollHeight > this.clientHeight) {
        this.style.height = this.scrollHeight + 'px';
    }
}

function handleFileInput() {
    const files = [...this.files];
    const filesList = this.parentElement.querySelector('.files');

    if (files.length) {
        const newInput = cloneInput(this);

        this.classList.add('hide');
        this.removeEventListener('change', handleFileInput);
        this.parentElement.appendChild(newInput);

        files.forEach(f => {
            const fileElem = createFileItem(f, filesList, this);
            filesList.appendChild(fileElem);
        })
    }

    checkEmpty(filesList);
}

function removeFile(elem) {
    const targetInputId = elem.dataset.input;
    elem.parentElement.removeChild(elem);

    const otherInputsList = document.querySelector(`.files__item[data-input=${targetInputId}]`);

    if (!otherInputsList) {
        const emptyInput = document.getElementById(targetInputId);
        emptyInput.parentElement.removeChild(emptyInput);
    }
}

function createFileItem(file, filesList, input) {
    const inputTypeFileCount = input.parentElement
                                    .querySelectorAll('input[type="file"]')
                                    .length;
    const fileId = input.getAttribute('id');
    const filteredFileId = fileId.replace(/[0-9]/g, '');

    const fileElem = document.createElement('div');
    fileElem.classList.add('files__item');
    fileElem.dataset.input = `${filteredFileId}${inputTypeFileCount - 1}`;
    const fileName = document.createElement('p');
    const removeBtn = document.createElement('span');
    removeBtn.classList.add('remove');

    fileName.innerHTML = file.name;
    fileElem.addEventListener('click', function (e) {
        const target = e.target;

        if (target.classList.contains('remove')) {
            removeFile(this);
            checkEmpty(filesList);
            switchFileBtn(filesList);
        }
    });

    fileElem.appendChild(fileName);
    fileElem.appendChild(removeBtn);

    return fileElem;
}

function checkEmpty(elem) {
    if (elem.children.length && elem.classList.contains('empty')) {
        elem.classList.remove('empty');
    } else if (!elem.children.length && !elem.classList.contains('empty')) {
        elem.classList.add('empty');
    }
}

function switchFileBtn(list) {
    if (!list.children.length) {
        const btn = list.parentElement.querySelector('input[type="file"]');
        console.log(btn);

        if (btn.classList.contains('add-more')) {
            btn.classList.remove('add-more');
        }
    }
}

function cloneInput(input) {
    const fileId = input.getAttribute('id');
    const filteredFileId = fileId.replace(/[0-9]/g, '');

    const newInput = input.cloneNode();
    const inputTypeFileCount = input.parentElement
                                    .querySelectorAll('input[type="file"]')
                                    .length + 1;
    newInput.setAttribute('id', `${filteredFileId}${inputTypeFileCount}`);
    newInput.setAttribute('name', `${filteredFileId}${inputTypeFileCount}`);
    newInput.classList.add('add-more');
    document.querySelector('.file-label')
        .setAttribute('for', `${filteredFileId}${inputTypeFileCount}`);
    newInput.addEventListener('change', handleFileInput);

    return newInput;
}

function getArctctg(x, y) {
    if (x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);

    if (x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);

    if (x < 0 && y < 0) return Math.PI + Math.atan(y / x);

    if (x > 0 && y < 0) return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y));
}