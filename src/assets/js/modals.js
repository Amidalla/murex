export function InitMobileMenu() {
    const burger = document.querySelector('.header__burger.burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!burger || !mobileMenu) return;

    // Создаем уникальный оверлей для мобильного меню
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    menuOverlay.style.cssText = `
        position: fixed;
        top: 79px;
        left: 0;
        width: 100%;
        height: calc(100% - 79px);
        background: rgba(0, 0, 0, 0.7);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1001;
    `;
    document.body.appendChild(menuOverlay);

    // Функция открытия меню
    function openMenu() {
        burger.classList.add('is-active');
        mobileMenu.classList.add('active');
        menuOverlay.style.opacity = '1';
        menuOverlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия меню
    function closeMenu() {
        burger.classList.remove('is-active');
        mobileMenu.classList.remove('active');
        menuOverlay.style.opacity = '0';
        menuOverlay.style.visibility = 'hidden';
        document.body.style.overflow = '';
    }

    // Функция переключения меню
    function toggleMenu() {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Обработчик клика на бургер
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Закрытие по клику на оверлей
    menuOverlay.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Закрытие при клике на ссылки внутри меню
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Обработка изменения размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (mobileMenu.classList.contains('active')) {
                menuOverlay.style.height = `calc(${window.innerHeight}px - 79px)`;
                menuOverlay.style.top = '79px';
            }
        }, 250);
    });
}