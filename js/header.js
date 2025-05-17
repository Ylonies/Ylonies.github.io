document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.main-header');
  const profileSection = document.querySelector('.profile-section');
  const navLinks = document.querySelectorAll('.nav-link');

  // Фиксация хэдера при скролле
  if (!window.matchMedia('(max-width: 768px)').matches) {
    window.addEventListener('scroll', function() {
      const shouldFix = window.scrollY >= profileSection.offsetHeight - 100;
      header.classList.toggle('fixed', shouldFix);
    });
  } else {
    header.classList.add('fixed');
  }

  // Обработка кликов по пунктам меню
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Удаляем класс active у всех ссылок
      navLinks.forEach(item => item.classList.remove('active'));

      // Добавляем класс active только к текущей ссылке
      this.classList.add('active');

      // Прокрутка к секции (если нужно)
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Автоматическое обновление активного пункта при скролле
  window.addEventListener('scroll', updateActiveLink);

  function updateActiveLink() {
    const scrollPosition = window.scrollY;

    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
});