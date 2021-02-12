const toTopBtn = document.getElementById('to-top-button');

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 300) toTopBtn.classList.add('show');
  else toTopBtn.classList.remove('show');
});

toTopBtn.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
