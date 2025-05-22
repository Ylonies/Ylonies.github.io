document.addEventListener('DOMContentLoaded', () => {
    const HOUR_IN_MS = 300000; //поменяла на время жизни в 5 минут для отладки
    const popupCookieName = 'popupClosedTime';

    function getCookie(name) {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? JSON.parse(decodeURIComponent(match[2])) : null;
    }

    function setCookie(name, value) {
        const date = new Date();
        date.setTime(date.getTime() + HOUR_IN_MS);
        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${date.toUTCString()}; path=/`;
    }

    const popupData = getCookie(popupCookieName);

    if (popupData?.timestamp && Date.now() - popupData.timestamp < HOUR_IN_MS) {
        return;
    }

    const popup = document.getElementById('delayed-popup');
    const closePopup = () => {
        clearTimeout(popup.timer);
        popup.classList.remove('active');
        setCookie(popupCookieName, { timestamp: Date.now() });
    };

    popup.timer = setTimeout(() => popup.classList.add('active'), 30000);
    popup.querySelector('.close-btn').addEventListener('click', closePopup);
    popup.addEventListener('click', e => e.target === popup && closePopup());
    document.addEventListener('keydown', e => e.key === 'Escape' && popup.classList.contains('active') && closePopup());
});