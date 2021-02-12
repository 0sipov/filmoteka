'use strict';

const movieGallery = document.querySelector('#js-moviesList');
const libraryGallery = document.querySelector('#js-library');

const searchField = document.querySelector('#js-form');
const searchInput = document.querySelector('#search');
const moviesList = document.querySelector('#js-moviesList');
const detailsPage = document.querySelector('#js-detailsPage');
const homePage = document.querySelector('#js-homePage');
const headerError = document.querySelector('.error-message');

//detailsPage refs
const detailsModal = document.querySelector('#js-detailsPage');
const detailsPreviewImg = document.querySelector('#js-previewImg');
const detailsVote = document.querySelector('#js-detailsVote');
const detailsVotes = document.querySelector('#js-detailsVotes');
const detailsTitle = document.querySelector('.details-title');
const detailsDescription = document.querySelector('#js-detailsText');
const detailsPopularuty = document.querySelector('#details-popularity');
// const detailsGenre = document.querySelector('#details-genre');
const detailsOriginalTitle = document.querySelector('#details-originalTitle');
// const detailsButtonClose = document.querySelector('.button-close');
const movieTrailer = document.getElementById('js-movieTrailer');

// for pagination refs
const buttonLeftRef = document.querySelector(
  '.pagination__button[data-index = "left"]',
);
const buttonRightRef = document.querySelector(
  '.pagination__button[data-index = "right"]',
);
const buttonOneRef = document.querySelector(
  '.pagination__button[data-index = "1"]',
);
const buttonTwoRef = document.querySelector(
  '.pagination__button[data-index = "2"]',
);
const buttonThreeRef = document.querySelector(
  '.pagination__button[data-index = "3"]',
);
const buttonFourRef = document.querySelector(
  '.pagination__button[data-index = "4"]',
);
const buttonFiveRef = document.querySelector(
  '.pagination__button[data-index = "5"]',
);

const body = document.querySelector('body');

const apiKey = '5f4a8cd7bcedd7efa785bad615b94f98';
let inputValue = '';
let pageNumber = 1;
let genres;

let renderedMovies = [];



function createMarkup() {
  addPreloader();
  fetchFilms().then(result => {
    if (inputValue === '') {
      removePreloader();
      headerError.textContent = 'Please enter movie name';
      return;
    } else {
      moviesList.innerHTML = '';
      headerError.textContent = '';
    }

    result.results.forEach(element => {
      fetchMoviesId(element.id).then(res => {
        moviesList.insertAdjacentHTML(
          'beforeend',
          createCard(
            res.poster_path,
            res.title,
            res.id,
            res.release_date,
            res.vote_average,
            res.budget,
            res.revenue,
            res.genres,
          ),
        );
      });
    });

    if (result.results.length === 0) {
      removePreloader();
      headerError.textContent =
        'No movies were found. Please specify your request';
      createStartupMarkup();
    }

    removePreloader();
    renderedMovies = result.results;
    return renderedMovies;
  });
}

function createStartupMarkup() {
  addPreloader();
  fetchPopularFilms().then(result => {
    moviesList.innerHTML = '';
    result.results.forEach(element => {
      fetchMoviesId(element.id).then(res => {
        moviesList.insertAdjacentHTML(
          'beforeend',
          createCard(
            res.poster_path,
            res.title,
            res.id,
            res.release_date,
            res.vote_average,
            res.budget,
            res.revenue,
            res.genres,
          ),
        );
      });
    });
    removePreloader();
    renderedMovies = result.results;
    return renderedMovies;
  });
}

function createCard(
  imgPath,
  movieTitle,
  movieId,
  date,
  avgVote,
  budget,
  revenue,
  genres,
) {
  const movieItem = document.createElement('li');
  movieItem.classList.add('main__movieItem');
  movieItem.setAttribute('id', 'js-movieItem');

  const previewImg = document.createElement('img');
  previewImg.classList.add('main__previewImgItem');
  if (imgPath) {
    previewImg.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500/${imgPath}`,
    );
  } else {
    previewImg.setAttribute('src', './images/plug.jpg');
  }
  previewImg.setAttribute('data-id', movieId);
  previewImg.setAttribute('id', 'js-image');

  const previewImgTitle = document.createElement('h2');
  previewImgTitle.classList.add('main__previewImgTitle');

  const previewTitleContainer = document.createElement('div');
  previewTitleContainer.classList.add('main__previewTitleContainer');
  previewTitleContainer.append(previewImgTitle);

  const deleteLibraryButton = document.createElement('button');
  deleteLibraryButton.classList.add('btn-delete');
  deleteLibraryButton.classList.add('hidden');
  deleteLibraryButton.setAttribute('type', 'button');
  deleteLibraryButton.innerHTML = `<svg class="svg-delete" width="24" height="24">
  <use href="./images/symbol-defs2.svg#icon-iconfinder_trash_115789"></use>
</svg>`;
  if (localStorage.getItem('activePage') === 'activeLibraryPage') {
    deleteLibraryButton.classList.remove('hidden');
  } else deleteLibraryButton.classList.add('hidden');

  const previewInfoBlock = createShortDescription(
    avgVote,
    date,
    budget,
    revenue,
    genres,
  );

  const releaseYear = new Date(date).getFullYear();
  if (!Number.isNaN(releaseYear)) {
    previewImgTitle.textContent = `${movieTitle} (${releaseYear})`;
  } else {
    previewImgTitle.textContent = movieTitle;
  }
  movieItem.append(
    previewImg,
    previewTitleContainer,
    previewInfoBlock,
    deleteLibraryButton,
  );
  return movieItem.outerHTML;
}

function createShortDescription(
  vote,
  releaseDate,
  budget,
  revenue,
  movieGenres,
) {
  let genres = movieGenres
    .reduce((acc, item) => acc + `${item.name}, `, '')
    .slice(0, -2);

  //   let genres = movieGenres
  //     .filter(el => {
  //       el.find(movie => el.id === movie) ? true : false;
  //     })
  //     .reduce((acc, item) => acc + `${item.name}, `, '')
  //     .slice(0, -2);

  const previewInfoBlock = document.createElement('div');
  previewInfoBlock.classList.add('main__previewInfoBlock');
  previewInfoBlock.innerHTML = `
  <h2 id="js-minicardVotes" class="minicard__title">Avarage raiting</h2>
<span class="minicard__description">${vote}</span>
<h2 id="js-minicardReleaseDate" class="minicard__title">Release date</h2>
<p class="minicard__description">${releaseDate}</p>
<h2 id="js-minicardRevenue" class="minicard__title">Genres</h2>
<p class="minicard__description">${genres}</p>`;

  return previewInfoBlock;
}
