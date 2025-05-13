// Этот файл добавляет обнаружение ширины полосы прокрутки и поддержку блокировки прокрутки
// для предотвращения смещения контента

// Определяем ширину полосы прокрутки при загрузке страницы
function calculateScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode?.removeChild(outer);

    // Устанавливаем CSS переменную
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    return scrollbarWidth;
}

// Обнаруживаем поддержку scrollbar-gutter
function detectScrollbarGutterSupport() {
    // Создаем тестовый элемент
    const testEl = document.createElement('div');
    testEl.style.cssText = 'scrollbar-gutter: stable';

    // Если после установки свойства оно осталось в стиле, значит оно поддерживается
    const isSupported = testEl.style.scrollbarGutter === 'stable';

    if (!isSupported) {
        // Если свойство не поддерживается, добавляем резервный класс
        document.documentElement.classList.add('no-scrollbar-gutter-support');
    }

    return isSupported;
}

// Отслеживаем открытие/закрытие drawer от vaul
function observeVaulDrawerClasses() {
    // Создаем MutationObserver для отслеживания изменений классов
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const htmlElement = document.documentElement;
                if (htmlElement.classList.contains('vaul-drawer-open')) {
                    // При открытии drawer, добавляем класс with-scrollbar,
                    // чтобы компенсировать удаление полосы прокрутки
                    htmlElement.classList.add('with-scrollbar');
                } else {
                    // При закрытии drawer, удаляем класс
                    htmlElement.classList.remove('with-scrollbar');
                }
            }
        });
    });

    // Начинаем наблюдение за изменениями классов на html элементе
    observer.observe(document.documentElement, { attributes: true });

    return observer;
}

// Запускаем все функции при загрузке
window.addEventListener('DOMContentLoaded', () => {
    // Вычисляем ширину полосы прокрутки
    calculateScrollbarWidth();

    // Проверяем поддержку scrollbar-gutter
    detectScrollbarGutterSupport();

    // Наблюдаем за классами от vaul
    const observer = observeVaulDrawerClasses();

    // Очистка при выгрузке страницы
    window.addEventListener('beforeunload', () => {
        observer.disconnect();
    });
});
