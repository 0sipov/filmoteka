const watchedFilms = document.querySelector('.watched-list');
const watchedButton = document.querySelector('#watched');
const queueButton = document.querySelector('#queue');
const deleteFromCardBtn = document.querySelectorAll('btn-delete');

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
  }
  return;
}

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
}

function createQueqeCard(moviesQueue) {
  moviesQueue.forEach(el => {
    fetchMoviesId(el).then(res => {
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
}

function activePage(active, notActive) {
  active.classList.add('button-active');
  notActive.classList.remove('button-active');
}

//for library page
function libraryListener() {
  // if (localStorage.getItem('activePage') === 'activeLibraryPage') {
  activeLibraryPage();
  drawWatchedFilmList();
  // libraryGallery.addEventListener('click', openLibraryMovieDetails);
  // };
}

function openLibraryMovieDetails(event) {
  if (event.target.nodeName === 'IMG') {
    let id = event.target.dataset.id;
    activateDetailsPage(id, true);
    toggleButtonWatcher(id);
    // console.log('myLibraryLink ', myLibraryLink.classList.contains('current'));
    // console.log('watchedButton ', watchedButton.classList.contains('button-active'));
    // console.log('queueButton ', queueButton.classList.contains('button-active'));
  }
}

if (localStorage.getItem('activePage') === 'activeLibraryPage') {
  libraryListener();
}

myLibraryPage.addEventListener('click', deleteFromCard);

function deleteFromCard(e) {
  let filmsWatchedFromLocalStorage = JSON.parse(
    localStorage.getItem('filmsWatched'),
  );
  let filmsQueueFromLocalStorage = JSON.parse(
    localStorage.getItem('filmsQueue'),
  );

  let element;
  if (
    e.target.nodeName === 'use' ||
    e.target.nodeName === 'svg' ||
    e.target.nodeName === 'BUTTON'
  ) {
    console.log('check');
    // if (deleteFromCardBtn) {
    // console.log(e.target.nodeName);
    if (e.target.parentNode.nodeName === 'BUTTON') {
      element = e.target.parentNode.parentNode;
    } else if (e.target.nodeName === 'use') {
      element = e.target.parentNode.parentNode.parentNode;
    } else {
      element = e.target.parentNode;
    }

    // }
  } else {
    return;
  }

  let id = element.querySelector('img').dataset.id;

  console.log(id);

  if (
    myLibraryLink.classList.contains('current') &&
    queueButton.classList.contains('button-active') &&
    filmsQueueFromLocalStorage.includes(id)
  ) {
    removeUserQueueFilm(id);
    console.log('filmsQueueFromLocalStorage ', filmsQueueFromLocalStorage);
    filmsQueueFromLocalStorage = filmsQueueFromLocalStorage.filter(
      el => el !== id,
    );
    // console.log('filmsQueueFromLocalStorage ', filmsQueueFromLocalStorage);
    localStorage.setItem(
      'filmsQueue',
      JSON.stringify(filmsQueueFromLocalStorage),
    );
    element.parentNode.removeChild(element);
  }

  if (
    myLibraryLink.classList.contains('current') &&
    watchedButton.classList.contains('button-active') &&
    filmsWatchedFromLocalStorage.includes(id)
  ) {
    removeUserWatchedFilm(id);
    // console.log('filmsWatchedFromLocalStorage ', filmsWatchedFromLocalStorage);
    filmsWatchedFromLocalStorage = filmsWatchedFromLocalStorage.filter(
      el => el !== id,
    );
    // console.log('filmsQueueFromLocalStorage ', filmsWatchedFromLocalStorage);
    localStorage.setItem(
      'filmsWatched',
      JSON.stringify(filmsWatchedFromLocalStorage),
    );
    element.parentNode.removeChild(element);
  }
}
