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
        let partnersSwiper = null;

        const initPartnersSlider = () => {
            if (partnersSwiper) {
                partnersSwiper.destroy(true, true);
            }

            partnersSwiper = new Swiper(partnersSlider, {
                modules: [Navigation, Autoplay],
                slidesPerView: 6,
                spaceBetween: 65.89,
                loop: true,
                speed: 800,
                autoHeight: false,

                navigation: {
                    nextEl: '.main-partners .swiper-button-next',
                    prevEl: '.main-partners .swiper-button-prev',
                },

                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },

                breakpoints: {
                    1400: {
                        slidesPerView: 6,
                        spaceBetween: 65.89,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        },
                        navigation: {
                            enabled: true,
                        },
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        },
                        navigation: {
                            enabled: true,
                        },
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        },
                        navigation: {
                            enabled: true,
                        },
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        },
                        navigation: {
                            enabled: true,
                        },
                    },
                    576: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                        autoplay: false,
                        centeredSlides: false,
                        loop: false,
                        navigation: {
                            enabled: false,
                        },
                    },
                    0: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                        autoplay: false,
                        centeredSlides: false,
                        loop: false,
                        navigation: {
                            enabled: false,
                        },
                    }
                },
            });
        };

        initPartnersSlider();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initPartnersSlider();
            }, 150);
        });
    }
}