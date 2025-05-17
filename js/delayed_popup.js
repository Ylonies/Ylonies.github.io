// Отложенный попап
document.addEventListener('DOMContentLoaded', function() {
    const delayedPopup = document.getElementById('delayed-popup');
    const delayedCloseBtn = delayedPopup.querySelector('.close-btn');

    setTimeout(() => {
        delayedPopup.classList.add('active');
    }, 30000);

    delayedCloseBtn.addEventListener('click', closeDelayedPopup);
    delayedPopup.addEventListener('click', function(e) {
        if (e.target === delayedPopup) closeDelayedPopup();
    });

    function closeDelayedPopup() {
        delayedPopup.classList.remove('active');
        localStorage.setItem('popupClosed', 'true');
    }
});