document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('popupClosed') === 'true') {
        return;
    }

    const delayedPopup = document.getElementById('delayed-popup');
    const delayedCloseBtn = delayedPopup.querySelector('.close-btn');

    const popupTimer = setTimeout(() => {
        delayedPopup.classList.add('active');
    }, 30000);

    function closeDelayedPopup() {
        clearTimeout(popupTimer);
        delayedPopup.classList.remove('active');
        localStorage.setItem('popupClosed', 'true');
    }

    delayedCloseBtn.addEventListener('click', closeDelayedPopup);
    delayedPopup.addEventListener('click', function(e) {
        if (e.target === delayedPopup){
         closeDelayedPopup();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && delayedPopup.classList.contains('active')) {
            closeDelayedPopup();
        }
    });
});