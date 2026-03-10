import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/home.scss";
import "../styles/modals.scss";
import LazyLoad from "vanilla-lazyload";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IMask from 'imask';
import { SlidersInit } from './sliders.js';
import { InitMobileMenu } from './modals.js';

// Добавляем импорт стилей Swiper
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

document.addEventListener('DOMContentLoaded', function() {
    const lazyLoadInstance = new LazyLoad();

    // Убедимся, что DOM полностью загружен
    setTimeout(() => {
        SlidersInit();
    }, 100);

    initPhoneMasks();

    Fancybox.bind("[data-fancybox]", {
        Thumbs: false,
        Toolbar: false,
        Images: {
            zoom: true,
        },
    });

    InitMobileMenu();
});