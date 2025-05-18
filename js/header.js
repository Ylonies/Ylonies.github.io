document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.main-header');
  const profileSection = document.querySelector('.profile-section');
  const navLinks = document.querySelectorAll('.nav-link');

   window.addEventListener('scroll', function() {
      const shouldFix = window.scrollY >= profileSection.offsetHeight - 100;
      header.classList.toggle('fixed', shouldFix);
   });

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(item => item.classList.remove('active'));

      this.classList.add('active');

      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', updateActiveLink);

  function updateActiveLink() {
    const scrollPosition = window.scrollY;

    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const sectionTop = section.offsetTop - 150;
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