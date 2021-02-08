const watchedFilms = document.querySelector('.watched-list');
const watchedButton = document.querySelector('#watched');
const queueButton = document.querySelector('#queue');



watchedButton.addEventListener('click', drawWatchedFilmList);
queueButton.addEventListener('click', drawQueueFilmList);

let watchedAndQueueFilms = [];

function drawWatchedFilmList() {

  activePage(watchedButton, queueButton);
  watchedFilms.innerHTML = '';
  const moviesWatched = JSON.parse(localStorage.getItem('filmsWatched'));

  if (moviesWatched === null || moviesWatched.length === 0) {
    watchedFilms.innerHTML = `<img class="catch-error-pagination" src="./images/image1.jpg" />`;
  } else {
    createWatchCard(moviesWatched);
    
  };
  return;
};

function drawQueueFilmList() {

  activePage(queueButton, watchedButton);
  watchedFilms.innerHTML = '';
  const moviesQueue = JSON.parse(localStorage.getItem('filmsQueue'));

  if (moviesQueue === null || moviesQueue.length === 0) {
    watchedFilms.innerHTML = `<img class="catch-error-pagination" src="./images/image1.jpg" />`;
  } else {
    createQueqeCard(moviesQueue);
    
  }
  return;
}

function createWatchCard(moviesWatched) {
  moviesWatched.forEach(el => {
    fetchMoviesId(el).then(res => {
      // console.log("CARD     WATCHED ",res);
      watchedAndQueueFilms.push(res);
      watchedFilms.insertAdjacentHTML(
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
  deleteLibraryButton.classList.remove('hidden');
};

function createQueqeCard(moviesQueue) {
  moviesQueue.forEach(el => {
    fetchMoviesId(el).then(res => {
      watchedAndQueueFilms.push(res);
      console.log("CARD     QUEUE ", res);
      watchedFilms.insertAdjacentHTML(
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
  deleteLibraryButton.classList.remove('hidden');
  };

function activePage(active, notActive) {
  active.classList.add('button-active');
  notActive.classList.remove('button-active');
};

//for library page
function libraryListener() {

  // if (localStorage.getItem('activePage') === 'activeLibraryPage') {
  activeLibraryPage();
  drawWatchedFilmList();
  // libraryGallery.addEventListener('click', openLibraryMovieDetails);
  // };
};

function openLibraryMovieDetails(event) {

  if (event.target.nodeName === 'IMG') {
    let id = event.target.dataset.id;
    activateDetailsPage(id, true);
    toggleButtonWatcher(id);
  };
};

if (localStorage.getItem('activePage') === 'activeLibraryPage') {
  libraryListener();
};