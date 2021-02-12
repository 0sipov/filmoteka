// const watchedButtonAdd = document.querySelector('.button-add-to-watch');
// const queueButtonAdd = document.querySelector('.button-add-to-queue');

// movieGallery.addEventListener('click', event => {
//     if (event.target.nodeName === 'IMG') {
//         let id = event.target.dataset.id;
//         activateDetailsPage(id);
//         toggleButtonWatcher(id);
//     }
// });

// detailsButtonClose.addEventListener('click', closeModal);
// detailsModal.addEventListener('click', closeModal);
// document.addEventListener('keydown', closeModal);

// function closeModal(event) {
//     if (
//         event.target.classList.contains('details-container') ||
//         event.target.classList.contains('details-close') ||
//         event.target.nodeName === 'use' ||
//         event.key === 'Escape'
//     ) {
//         // toTopBtn.classList.add('show');
//         body.classList.remove('blocked-scroll');
//         detailsModal.classList.add('hidden');
//         // stop player youtube
//         document.querySelector('iframe').src = '';
//     }
// }
// let selectedMovie;

// function activateDetailsPage(id, itsLibraryMovie) {
//     selectedMovie = renderedMovies.find(movie => movie.id === Number(id));
//     if (itsLibraryMovie) {
//         let allLocalStorageMovies = [
//             ...JSON.parse(localStorage.getItem('filmsQueue')),
//             ...JSON.parse(localStorage.getItem('filmsWatched')),
//         ];
//         selectedMovie = allLocalStorageMovies.find(
//             movie => movie.id === Number(id),
//         );
//     } else {
//         selectedMovie = renderedMovies.find(movie => movie.id === Number(id));
//     }

//     openMovieDetails(selectedMovie);
//     document
//         .querySelector('.details-img')
//         .setAttribute('data-filmId', selectedMovie.id);

// }

// fetchGenres();

// function openMovieDetails(selectedMovie) {
//     // toTopBtn.classList.remove('show');
//     body.classList.add('blocked-scroll');
//     detailsModal.classList.remove('hidden');
//     if (selectedMovie.poster_path) {
//         detailsPreviewImg.setAttribute(
//             'src',
//             `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`,
//         );
//     } else {
//         detailsPreviewImg.setAttribute('src', '../images/plug.jpg');
//     }

//     fetchMovies(selectedMovie.id).then(res => {
//         movieTrailer.innerHTML = `
//     <iframe

//       src="https://www.youtube.com/embed/${res}"
//       frameborder="0"
//       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//       allowfullscreen
//     ></iframe>
//   `;
//     });

//     detailsTitle.textContent = selectedMovie.title;
//     detailsDescription.textContent = selectedMovie.overview;
//     detailsPopularuty.innerHTML = selectedMovie.popularity;
//     detailsOriginalTitle.textContent = selectedMovie.original_title;
//     detailsVote.textContent = selectedMovie.vote_average;
//     detailsVotes.textContent = `/ ${selectedMovie.vote_count}`;
//     detailsGenre.textContent = String(
//         genres
//         .filter(el =>
//             selectedMovie.genre_ids.find(movie => el.id === movie) ? true : false,
//         )
//         .reduce((acc, item) => acc + `${item.name}, `, ''),
//     ).slice(0, -2);
// }

// function toggleButtonWatcher(id) {
//     let filmsWatchedFromLocalStorage = getArrayFromLocalStorage('filmsWatched');
//     let filmsQueueFromLocalStorage = getArrayFromLocalStorage('filmsQueue');
//     if (filmsWatchedFromLocalStorage !== null) {
//         if (filmsWatchedFromLocalStorage.includes(id)) {
//             watchedButtonAdd.classList.add('button-is-active');
//             watchedButtonAdd.textContent = 'IN WATCHED';
//         } else {
//             watchedButtonAdd.classList.remove('button-is-active');
//             watchedButtonAdd.textContent = 'ADD TO WATCHED';
//         }
//     }
//     if (filmsQueueFromLocalStorage !== null) {
//         if (filmsQueueFromLocalStorage.includes(id)) {
//             queueButtonAdd.classList.add('button-is-active');
//             queueButtonAdd.textContent = 'IN QUEUE';
//         } else {
//             queueButtonAdd.classList.remove('button-is-active');
//             queueButtonAdd.textContent = 'ADD TO QUEUE';
//         }
//     }

//     function getArrayFromLocalStorage(key) {
//         return JSON.parse(localStorage.getItem(`${key}`));
//     }
// }
// TABS for movie details
// const tabLinks = document.querySelectorAll('.tabs a');
// const tabPanels = document.querySelectorAll('.tabs-panel');

// for (let el of tabLinks) {
//   el.addEventListener('click', e => {
//     e.preventDefault();

//     document.querySelector('.tabs li.active').classList.remove('active');
//     document.querySelector('.tabs-panel.active').classList.remove('active');

//     const parentListItem = el.parentElement;
//     parentListItem.classList.add('active');
//     const index = [...parentListItem.parentElement.children].indexOf(
//       parentListItem,
//     );

//     const panel = [...tabPanels].filter(
//       el => el.getAttribute('data-index') == index,
//     );
//     panel[0].classList.add('active');
//   });
// }

// buttons and local storage in modal

// runLocalStorage();

// function runLocalStorage() {
//     watchedButtonAdd.addEventListener('click', toggleToWatched);
//     queueButtonAdd.addEventListener('click', toggleToQueue);

//     function toggleToWatched() {
//         let currentId = document.querySelector('.details-img').dataset.filmid;
//         let filmsIdFromLocalStorage = getArrayFromLocalStorage('filmsWatched');
//         if (filmsIdFromLocalStorage === null) {
//             watchedButtonAdd.classList.add('button-is-active');
//             watchedButtonAdd.textContent = 'IN WATCHED';
//             localStorage.setItem('filmsWatched', JSON.stringify([currentId]));
//         } else if (filmsIdFromLocalStorage.includes(currentId)) {
//             watchedButtonAdd.classList.remove('button-is-active');
//             watchedButtonAdd.textContent = 'ADD TO WATCHED';
//             removeFilmIdFromArray('filmsWatched', currentId);
//         } else {
//             watchedButtonAdd.classList.add('button-is-active');
//             watchedButtonAdd.textContent = 'IN WATCHED';
//             addFilmIdArray('filmsWatched', currentId);
//         }
//     }

//     function toggleToQueue() {
//         let currentId = document.querySelector('.details-img').dataset.filmid;
//         let filmsIdFromLocalStorage = getArrayFromLocalStorage('filmsQueue');
//         if (filmsIdFromLocalStorage === null) {
//             queueButtonAdd.classList.add('button-is-active');
//             queueButtonAdd.textContent = 'IN QUEUE';
//             localStorage.setItem('filmsQueue', JSON.stringify([currentId]));
//         } else if (filmsIdFromLocalStorage.includes(currentId)) {
//             queueButtonAdd.classList.remove('button-is-active');
//             queueButtonAdd.textContent = 'ADD TO QUEUE';
//             removeFilmIdFromArray('filmsQueue', currentId);
//         } else {
//             queueButtonAdd.classList.add('button-is-active');
//             queueButtonAdd.textContent = 'IN QUEUE';

//             addFilmIdArray('filmsQueue', currentId);
//         }
//     }

//     function getArrayFromLocalStorage(key) {
//         return JSON.parse(localStorage.getItem(`${key}`));
//     }

//     function setArrayToLocalStorage(key, arrayFilms) {
//         localStorage.setItem(`${key}`, JSON.stringify(arrayFilms));
//     }

//     function addFilmIdArray(key, filmId) {
//         let arrayFilms = getArrayFromLocalStorage(key);
//         arrayFilms.push(filmId);
//         setArrayToLocalStorage(key, arrayFilms);
//     }

//     function removeFilmIdFromArray(key, filmId) {
//         let arrayFilms = getArrayFromLocalStorage(key);
//         arrayFilms.splice(getArrayFromLocalStorage(key).indexOf(filmId), 1);
//         setArrayToLocalStorage(key, arrayFilms);
//     }
// }

// runLocalStorage();

// function runLocalStorage() {
//     watchedButtonAdd.addEventListener('click', toggleToWatched);
//     queueButtonAdd.addEventListener('click', toggleToQueue);

//     function toggleToWatched() {
//         let currentId = document.querySelector('.details-img').dataset.filmid;
//         let filmsIdFromLocalStorage = getArrayFromLocalStorage('filmsWatched');
//         if (filmsIdFromLocalStorage === null) {
//             watchedButtonAdd.classList.add('button-is-active');
//             watchedButtonAdd.textContent = 'IN WATCHED';
//             writeUserWatchedFilm(currentId);
//         } else if (filmsIdFromLocalStorage.includes(currentId)) {
//             watchedButtonAdd.classList.remove('button-is-active');
//             watchedButtonAdd.textContent = 'ADD TO WATCHED';
//             removeUserWatchedFilm(currentId);
//         } else {
//             watchedButtonAdd.classList.add('button-is-active');
//             watchedButtonAdd.textContent = 'IN WATCHED';
//             writeUserWatchedFilm(currentId);
//         }
//     }

//     function toggleToQueue() {
//         let currentId = document.querySelector('.details-img').dataset.filmid;
//         let filmsIdFromLocalStorage = getArrayFromLocalStorage('filmsQueue');
//         if (filmsIdFromLocalStorage === null) {
//             queueButtonAdd.classList.add('button-is-active');
//             queueButtonAdd.textContent = 'IN QUEUE';
//             writeUserQueueFilm(currentId);
//         } else if (filmsIdFromLocalStorage.includes(currentId)) {
//             queueButtonAdd.classList.remove('button-is-active');
//             queueButtonAdd.textContent = 'ADD TO QUEUE';
//             removeUserQueueFilm(currentId);
//         } else {
//             queueButtonAdd.classList.add('button-is-active');
//             queueButtonAdd.textContent = 'IN QUEUE';
//             writeUserQueueFilm(currentId);
//         }
//     }

//     function getArrayFromLocalStorage(key) {
//         return JSON.parse(localStorage.getItem(`${key}`));
//     }

//     function setArrayToLocalStorage(key, arrayFilms) {
//         localStorage.setItem(`${key}`, JSON.stringify(arrayFilms));
//     }

//     function addFilmIdArray(key, filmId) {
//         let arrayFilms = getArrayFromLocalStorage(key);
//         arrayFilms.push(filmId);
//         setArrayToLocalStorage(key, arrayFilms);
//     }

//     function removeFilmIdFromArray(key, filmId) {
//         let arrayFilms = getArrayFromLocalStorage(key);
//         arrayFilms.splice(getArrayFromLocalStorage(key).indexOf(filmId), 1);
//         setArrayToLocalStorage(key, arrayFilms);
//     }
// };
