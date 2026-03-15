import Swiper from 'swiper';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';

export function SlidersInit() {
    // Hero слайдер
    const heroSlider = document.querySelector('.hero-slider');

    if (heroSlider) {
        new Swiper(heroSlider, {
            modules: [Pagination, Navigation, EffectFade],
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 800,
            pagination: {
                el: '.hero-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.hero-slider .swiper-button-next',
                prevEl: '.hero-slider .swiper-button-prev',
            },
            autoplay: false,
        });
    }

    // Partners слайдер
    const partnersSlider = document.querySelector('.partners-slider');

    if (partnersSlider) {
        new Swiper(partnersSlider, {
            modules: [Navigation, Autoplay],
            slidesPerView: 6,
            spaceBetween: 65.89,
            loop: true,
            speed: 800,

            navigation: {
                nextEl: '.main-partners .swiper-button-next', // Уточненный селектор
                prevEl: '.main-partners .swiper-button-prev', // Уточненный селектор
            },

            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },

            breakpoints: {
                1200: {
                    slidesPerView: 6,
                    spaceBetween: 65.89,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                }
            }
        });
    }
}