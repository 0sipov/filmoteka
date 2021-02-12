function renderDetailFilmModal(movie) {
    
    return `
    <div id="js-detailsPage" class="details-container details-page hidden">
  <div class="details-wrapper">
    <img
      id="js-previewImg"
      class="details-img"
      src="https://image.tmdb.org/t/p/w500/${
        movie.poster_path ? movie.poster_path : './images/plug.jpg'
      }"
      alt="film-preview"
      width="100%"
      height="100%"
      data-filmId=${movie.id}
    />
    <div class="details-information">
      <button class="button-close close-details">
        <svg class="details-close">
          <use href="./images/symbol-defs.svg#close"></use>
        </svg>
      </button>
      <h1 class="details-title">${
        movie.title ? movie.title : 'a fistful of lead'
      }</h1>
      <div class="details-inf">
        <ul class="details-inf-list">
          <li>Vote / Votes</li>
          <li>Popularity</li>
          <li>Original Title</li>
          <li>Genre</li>
        </ul>
        <ul class="details-inf-list details-inf-list-secondary">
          <li>
            <span id="js-detailsVote" class="text-orange">${
              movie.vote_average ? movie.vote_average : '0.0'
            }</span>
            <span id="js-detailsVotes">/${
              movie.vote_count ? movie.vote_count : '0000'
            }</span>
          </li>
          <li id="details-popularity">${
            movie.popularity ? movie.popularity : '100.2'
          }</li>
          <li id="details-originalTitle">${
            movie.original_title ? movie.original_title : 'a fistful of lead'
          }</li>
          <li id="details-genre">Western</li>
        </ul>
      </div>

      <div class="tabs-container">
        <ul class="tabs">
          <li class="active">
            <a href="">ABOUT</a>
          </li>
          <li>
            <a href="">TRAILER</a>
          </li>
        </ul>
        <div class="tabs-content">
          <div
            id="js-detailsText"
            class="tabs-panel active"
            data-index="0"
          >${movie.overview}</div>
          <div
            id="js-movieTrailer"
            class="movie-trailer tabs-panel"
            data-index="1"
          ></div>
          <div class="tabs-panel" data-index="2">
            <p></p>
          </div>
        </div>
      </div>

      <div class="details-button-list">
        <button class="details-button button-add-to-watch">
          add to Watched
        </button>
        <button class="details-button button-add-to-queue">add to queue</button>
      </div>
    </div>
  </div>
</div>
    `;
}
