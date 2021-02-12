const myLibraryLink = document.querySelector('.link-library');
const myLibraryPage = document.querySelector('.my-library-page');
const myLibraryHeaderDiv = document.querySelector('.my-library-header-div');
const header = document.querySelector('header');
const homePageLink = document.querySelector('.link-header');
const homePageLogo = document.querySelector('.link-logo');

myLibraryLink.addEventListener('click', myLibraryLinkClick);

function myLibraryLinkClick() {
  // activeLibraryPage();
  libraryListener();
  libraryGallery.addEventListener('click', openLibraryMovieDetails);
}



homePageLink.addEventListener('click', activeHomePage);
homePageLogo.addEventListener('click', activeHomePage);

function activeHomePage() {
  inputValue = '';
  dischargePaginationAndCreateMarkup();
  myLibraryLink.classList.remove('current');
  homePageLink.classList.add('current');
  homePage.classList.remove('hidden');
  myLibraryPage.classList.add('hidden');
  searchField.classList.remove('hidden');
  header.classList.add('header');
  header.classList.remove('my-library-header');
  myLibraryHeaderDiv.classList.add('hidden');
  localStorage.setItem('activePage', 'activeHomePage');
  movieGallery.addEventListener('click', onFilmCardClickHandler);
  libraryGallery.removeEventListener('click', openLibraryMovieDetails);
};

function activeLibraryPage() {
  myLibraryLink.classList.add('current');
  homePageLink.classList.remove('current');
  homePage.classList.add('hidden');
  myLibraryPage.classList.remove('hidden');
  searchField.classList.add('hidden');
  header.classList.remove('header');
  header.classList.add('my-library-header');
  myLibraryHeaderDiv.classList.remove('hidden');
  headerError.innerHTML = '';
  localStorage.setItem('activePage', 'activeLibraryPage');
  libraryGallery.addEventListener('click', openLibraryMovieDetails);
  movieGallery.removeEventListener('click', onFilmCardClickHandler);
}

if (localStorage.getItem('activePage') === 'activeLibraryPage') {
  activeLibraryPage();

  libraryGallery.addEventListener('click', openLibraryMovieDetails);
  movieGallery.removeEventListener('click', onFilmCardClickHandler);
} else if (localStorage.getItem('activePage') === 'activeHomePage') {
  activeHomePage();

  libraryGallery.removeEventListener('click', openLibraryMovieDetails);
  movieGallery.addEventListener('click', onFilmCardClickHandler);
}
