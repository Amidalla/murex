import Swiper from 'swiper';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';

export function SlidersInit() {

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
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: false,
        });
    }
}