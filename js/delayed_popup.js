// Отложенный попап
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('popupClosed') === 'true') {
        return; // Если закрывал - ничего не делаем
    }

    const delayedPopup = document.getElementById('delayed-popup');
    const delayedCloseBtn = delayedPopup.querySelector('.close-btn');

    // Показываем попап через 30 секунд (30000 миллисекунд)
    const popupTimer = setTimeout(() => {
        delayedPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }, 30000);

    // Функция закрытия попапа
    function closeDelayedPopup() {
        clearTimeout(popupTimer); // Отменяем таймер, если пользователь закрыл вручную
        delayedPopup.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
        localStorage.setItem('popupClosed', 'true'); // Запоминаем, что пользователь закрыл попап
    }

    // Обработчики событий
    delayedCloseBtn.addEventListener('click', closeDelayedPopup);
    delayedPopup.addEventListener('click', function(e) {
        if (e.target === delayedPopup) closeDelayedPopup();
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && delayedPopup.classList.contains('active')) {
            closeDelayedPopup();
        }
    });
});