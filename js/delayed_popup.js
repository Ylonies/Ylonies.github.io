document.addEventListener('DOMContentLoaded', function() {
    const HOUR_IN_MS = 3600000;
    const popupStorageKey = 'popupClosedTime';

    const popupClosedTime = localStorage.getItem(popupStorageKey);
    if (popupClosedTime && (Date.now() - Number(popupClosedTime)) < HOUR_IN_MS) {
        console.log('Попап уже закрывался в последний час — не показываем');
        return;
    }

    const delayedPopup = document.getElementById('delayed-popup');
    const delayedCloseBtn = delayedPopup.querySelector('.close-btn');

    const popupTimer = setTimeout(() => {
        delayedPopup.classList.add('active');
    }, 3000);

    function closeDelayedPopup() {
        clearTimeout(popupTimer);
        delayedPopup.classList.remove('active');
        localStorage.setItem(popupStorageKey, Date.now());
    }

    delayedCloseBtn.addEventListener('click', closeDelayedPopup);
    delayedPopup.addEventListener('click', function(e) {
        if (e.target === delayedPopup) closeDelayedPopup();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && delayedPopup.classList.contains('active')) {
            closeDelayedPopup();
        }
    });
});