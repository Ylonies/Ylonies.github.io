document.addEventListener('DOMContentLoaded', function() {
  // Дата экзамена - 27 мая 2025 года
  const examDate = new Date('2025-05-27T09:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = examDate - now;

    // Если время наступило
    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    // Рассчитываем оставшееся время
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Обновляем отображение
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  // Обновляем сразу и затем каждую секунду
  updateCountdown();
  setInterval(updateCountdown, 1000);
});