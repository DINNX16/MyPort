// Supondo que você tenha uma seta com a classe .animated-arrow
document.addEventListener('DOMContentLoaded', function() {
  const arrow = document.querySelector('.animated-arrow');
  const resume = document.querySelector('.resume-section');
  const portfolio = document.querySelector('.portfolio-section');

  if (arrow && resume && portfolio) {
    arrow.addEventListener('click', () => {
      if (resume.classList.contains('active')) {
        resume.classList.remove('active');
        portfolio.classList.add('active');
      } else {
        portfolio.classList.remove('active');
        resume.classList.add('active');
      }
    });
  }
});