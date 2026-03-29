import Swiper from 'swiper';
import { Pagination, Navigation, EffectFade, Autoplay, Thumbs } from 'swiper/modules';

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

    // Product слайдер
    const productMainSlider = document.querySelector('.product-slider__main');
    const productThumbsSlider = document.querySelector('.product-slider__thumbs');

    if (productMainSlider && productThumbsSlider) {
        const prevButton = document.querySelector('.thumbs-button-prev');
        const nextButton = document.querySelector('.thumbs-button-next');

        const getVisibleSlidesCount = (swiper) => {
            const container = swiper.el;
            const containerWidth = container.offsetWidth;
            const slides = swiper.slides;

            if (!slides.length) return 0;

            const slideWidth = slides[0].offsetWidth;
            const spaceBetween = swiper.params.spaceBetween;

            let visibleCount = 0;
            let totalWidth = 0;

            for (let i = 0; i < slides.length; i++) {
                const slideWidthWithGap = slideWidth + (i > 0 ? spaceBetween : 0);
                if (totalWidth + slideWidthWithGap <= containerWidth) {
                    totalWidth += slideWidthWithGap;
                    visibleCount++;
                } else {
                    break;
                }
            }

            return visibleCount;
        };

        const toggleNavigationButtons = (swiper) => {
            if (!prevButton || !nextButton) return;

            const windowWidth = window.innerWidth;

            if (windowWidth <= 1250) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
                return;
            }

            const visibleSlides = getVisibleSlidesCount(swiper);
            const totalSlides = swiper.slides.length;

            if (totalSlides <= visibleSlides) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            } else {
                prevButton.style.display = '';
                nextButton.style.display = '';
            }
        };

        const thumbsSwiper = new Swiper(productThumbsSlider, {
            modules: [Navigation],
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: false,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.thumbs-button-next',
                prevEl: '.thumbs-button-prev',
            },
            on: {
                init: function(swiper) {
                    setTimeout(() => toggleNavigationButtons(swiper), 100);
                },
                breakpoint: function(swiper) {
                    setTimeout(() => toggleNavigationButtons(swiper), 100);
                },
                resize: function(swiper) {
                    toggleNavigationButtons(swiper);
                },
                update: function(swiper) {
                    toggleNavigationButtons(swiper);
                },
                transitionEnd: function(swiper) {
                    toggleNavigationButtons(swiper);
                }
            }
        });

        const mainSwiper = new Swiper(productMainSlider, {
            modules: [Thumbs, Pagination],
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            thumbs: {
                swiper: thumbsSwiper,
            },
            pagination: {
                el: '.main-pagination',
                clickable: true,
            },
        });

        setTimeout(() => {
            toggleNavigationButtons(thumbsSwiper);
        }, 200);

        window.addEventListener('resize', () => {
            setTimeout(() => toggleNavigationButtons(thumbsSwiper), 100);
        });

        const images = productThumbsSlider.querySelectorAll('.lazy');
        if (images.length) {
            const checkImagesLoaded = () => {
                let loadedCount = 0;
                images.forEach(img => {
                    if (img.complete) {
                        loadedCount++;
                    } else {
                        img.addEventListener('load', () => {
                            loadedCount++;
                            if (loadedCount === images.length) {
                                setTimeout(() => toggleNavigationButtons(thumbsSwiper), 100);
                            }
                        });
                    }
                });
                if (loadedCount === images.length) {
                    setTimeout(() => toggleNavigationButtons(thumbsSwiper), 100);
                }
            };
            checkImagesLoaded();
        }
    }

    // Options слайдер
    const optionsSlider = document.querySelector('.options-slider');

    if (optionsSlider) {
        const prevButton = document.querySelector('.options-button-prev');
        const nextButton = document.querySelector('.options-button-next');

        new Swiper(optionsSlider, {
            modules: [Navigation],
            slidesPerView: 5,
            spaceBetween: 20,
            loop: false,
            navigation: {
                nextEl: '.options-button-next',
                prevEl: '.options-button-prev',
            },
            breakpoints: {
                1501: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
                1251: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                1000: {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                450: {
                    slidesPerView: 1.9,
                    spaceBetween: 20,
                },
                0: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                }
            },
            on: {
                init: function(swiper) {
                    if (prevButton && nextButton) {
                        const totalSlides = swiper.slides.length;
                        const currentSlidesPerView = swiper.params.slidesPerView;

                        if (totalSlides <= Math.ceil(currentSlidesPerView)) {
                            prevButton.style.display = 'none';
                            nextButton.style.display = 'none';
                        } else {
                            prevButton.style.display = '';
                            nextButton.style.display = '';
                        }
                    }
                },
                resize: function(swiper) {
                    if (prevButton && nextButton) {
                        const totalSlides = swiper.slides.length;
                        const currentSlidesPerView = swiper.params.slidesPerView;

                        if (totalSlides <= Math.ceil(currentSlidesPerView)) {
                            prevButton.style.display = 'none';
                            nextButton.style.display = 'none';
                        } else {
                            prevButton.style.display = '';
                            nextButton.style.display = '';
                        }
                    }
                },
                breakpoint: function(swiper) {
                    if (prevButton && nextButton) {
                        const totalSlides = swiper.slides.length;
                        const currentSlidesPerView = swiper.params.slidesPerView;

                        if (totalSlides <= Math.ceil(currentSlidesPerView)) {
                            prevButton.style.display = 'none';
                            nextButton.style.display = 'none';
                        } else {
                            prevButton.style.display = '';
                            nextButton.style.display = '';
                        }
                    }
                }
            }
        });
    }
}