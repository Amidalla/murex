import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/home.scss";
import "../styles/modals.scss";
import "../styles/catalog.scss";
import "../styles/contacts.scss";
import "../styles/dealers.scss";
import "../styles/manufacture.scss";
import "../styles/product-card.scss";
import LazyLoad from "vanilla-lazyload";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IMask from 'imask';
import { SlidersInit } from './sliders.js';
import { InitMobileMenu } from './modals.js';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

function initPhoneMasks() {
    const phoneInputs = document.querySelectorAll(`
        input[type="tel"][name="tel"],
        input[type="tel"][data-phone-input]
    `);

    phoneInputs.forEach(input => {
        let mask = null;

        const initMask = () => {
            if (!mask) {
                input.classList.add('phone-mask-active');
                mask = IMask(input, {
                    mask: '+{7} (000) 000-00-00',
                    lazy: false
                });

                if (!input.value) {
                    input.value = '+7 (';
                }
            }
        };

        const destroyMask = () => {
            if (mask) {
                const phoneNumber = input.value.replace(/\D/g, '');
                if (phoneNumber.length < 11 || phoneNumber === '7') {
                    input.value = '';
                }
                input.classList.remove('phone-mask-active');
                mask.destroy();
                mask = null;
            }
        };

        input.addEventListener('focus', initMask);
        input.addEventListener('blur', destroyMask);

        input.addEventListener('input', (e) => {
            if (mask && input.value === '+7 (' && e.inputType === 'deleteContentBackward') {
                destroyMask();
            }
        });
    });
}


function initRedStarsInPlaceholders() {
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');

    requiredInputs.forEach(input => {

        if (input.closest('.placeholder-with-star-container')) {
            return;
        }

        const currentPlaceholder = input.getAttribute('placeholder') || '';

        if (currentPlaceholder && !currentPlaceholder.includes('*')) {

            const container = document.createElement('div');
            container.className = 'placeholder-with-star-container';
            container.style.position = 'relative';
            container.style.width = '100%';


            input.parentNode.insertBefore(container, input);
            container.appendChild(input);


            const inputStyles = window.getComputedStyle(input);
            const paddingLeft = inputStyles.paddingLeft;
            const fontSize = inputStyles.fontSize;
            const fontFamily = inputStyles.fontFamily;
            const lineHeight = inputStyles.lineHeight;


            const pseudoPlaceholder = document.createElement('div');
            pseudoPlaceholder.className = 'pseudo-placeholder';
            pseudoPlaceholder.innerHTML = currentPlaceholder + ' <span class="red-star" style="color: #ff0000;">*</span>';


            const baseStyles = {
                position: 'absolute',
                left: paddingLeft,
                top: input.tagName === 'TEXTAREA' ? '15px' : '50%',
                transform: input.tagName === 'TEXTAREA' ? 'none' : 'translateY(-50%)',
                color: '#5B5B5B',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: `calc(100% - ${parseInt(paddingLeft) * 2}px)`,
                zIndex: '5',
                fontFamily: fontFamily,
                fontSize: fontSize,
                lineHeight: lineHeight,
                transition: 'opacity 0.2s ease',
                opacity: '1'
            };


            Object.assign(pseudoPlaceholder.style, baseStyles);

            container.appendChild(pseudoPlaceholder);


            input.setAttribute('placeholder', '');


            input.addEventListener('focus', () => {
                pseudoPlaceholder.style.opacity = '0';
            });

            input.addEventListener('blur', () => {

                let isEmpty = true;

                if (input.type === 'tel' || input.name === 'tel' || input.hasAttribute('data-phone-input')) {
                    const digits = input.value.replace(/\D/g, '');
                    isEmpty = digits.length <= 1 || digits === '7';
                } else {
                    isEmpty = !input.value.trim();
                }

                pseudoPlaceholder.style.opacity = isEmpty ? '1' : '0';
            });


            setTimeout(() => {
                if (input.type === 'tel' || input.name === 'tel' || input.hasAttribute('data-phone-input')) {
                    const digits = input.value.replace(/\D/g, '');
                    pseudoPlaceholder.style.opacity = (digits.length > 1 && digits !== '7') ? '0' : '1';
                } else {
                    pseudoPlaceholder.style.opacity = input.value.trim() ? '0' : '1';
                }
            }, 0);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const lazyLoadInstance = new LazyLoad();


    setTimeout(() => {
        SlidersInit();
    }, 100);

    initPhoneMasks();


    initRedStarsInPlaceholders();

    Fancybox.bind("[data-fancybox]", {
        Thumbs: false,
        Toolbar: false,
        Images: {
            zoom: true,
        },
    });

    InitMobileMenu();
});


document.addEventListener('contentLoaded', function() {
    initRedStarsInPlaceholders();
});