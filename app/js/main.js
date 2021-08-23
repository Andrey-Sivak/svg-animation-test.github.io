'use strict';
import * as $ from 'jquery';
import './jquery.validate.min';

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
        if (!document.querySelector('form')) {
            return;
        }

        const form = document.querySelector('form');
        const textarea = form.querySelector('textarea');

        const budgetList = form.querySelector('.form__field.budget');

        let fileInput = form.querySelector('input[name="file1"]');
        const filesList = form.querySelector('.files');
        let inputTypeFileCount = 1;

        textarea.addEventListener('input', textareaHandleInput);

        fileInput.addEventListener('change', handleFileInput);

        budgetList.addEventListener('click', selectBudget);

        function handleFileInput(e) {
            const files = [...this.files];

            if (files.length) {
                const newInput = cloneInput(this);

                this.classList.add('hide');
                this.removeEventListener('change', handleFileInput);
                this.parentElement.appendChild(newInput);

                files.forEach(f => {
                    const fileElem = createFileItem(f);
                    filesList.appendChild(fileElem);
                })
            }

            checkEmpty(filesList);
        }

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
                        email: 'Некорректный e-mail'
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

        function textareaHandleInput(e) {
            if (this.scrollHeight > this.clientHeight) {
                this.style.height = this.scrollHeight + 'px';
            }
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

        function createFileItem(file) {
            const fileElem = document.createElement('div');
            fileElem.classList.add('files__item');
            fileElem.dataset.input = `file${inputTypeFileCount - 1}`;
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
            if (!list.length) {
                const btn = document.querySelector('input[type="file"]');

                if (btn.classList.contains('add-more')) {
                    btn.classList.remove('add-more');
                }
            }
        }

        function cloneInput(input) {
            const newInput = input.cloneNode();
            inputTypeFileCount++;
            newInput.setAttribute('id', `file${inputTypeFileCount}`);
            newInput.setAttribute('name', `file${inputTypeFileCount}`);
            newInput.classList.add('add-more');
            document.querySelector('.file-label')
                .setAttribute('for', `file${inputTypeFileCount}`);
            newInput.addEventListener('change', handleFileInput);

            return newInput;
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

        const processSectionTop = processSection.getBoundingClientRect().top - 100;

        window.addEventListener('scroll', function (e) {

            if (window.pageYOffset > processSectionTop
                && !svg.classList.contains('active')) {
                svg.classList.add('active');
            }
        })
    })();

});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}