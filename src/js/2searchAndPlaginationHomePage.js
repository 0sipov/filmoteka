const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

function inputChange() {
  if (searchInput.value.length != 0) {
    inputValue = searchInput.value;
    dischargePaginationAndCreateMarkup();
  }
}

searchInput.addEventListener('input', debounce(inputChange, 1200));
searchField.addEventListener('submit', event => {
  event.preventDefault();
  inputValue = event.currentTarget.elements[0].value;
  dischargePaginationAndCreateMarkup();
});

function fetchFilms() {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pageNumber}&include_adult=false&query=${inputValue}`,
  )
    .then(response => response.json())
    .then(data => {
      if (data.results.length != 0) {
        scrollToSectionHomePage();
      }
      return data;
    });
}

function fetchPopularFilms() {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

function fetchGenres() {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
  )
    .then(data => data.json())
    .then(res => {
      genres = [...res.genres];
    })
    .catch(err => console.log(err));
}

function fetchMovies(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`,
  )
    .then(res => res.json())
    .then(data => {
      if (data.results.length === 0 || !data.results[0].key) {
        return null;
      }
      return data.results[0].key;
    });
}

function fetchMoviesId(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
  )
    .then(res => res.json())
    .then(data => {
      return data;
    });
}

function paginationNavigation(arr) {
  pageNumber = arr[2];
  if (inputValue === '') createStartupMarkup();
  else createMarkup();
}
