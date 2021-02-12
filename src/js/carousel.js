let pageCarousel = '1';

function Carousel(
  frameSelector,
  sliderSelector,
  slidesSelector,
  btnLeftSelector,
  btnRightSelector,
) {
  //A variable to store the position of the slides
  let position = 0;

  const frame = document.querySelector(frameSelector);
  const slides = document.querySelectorAll(slidesSelector);

  const slidesNumber = slides.length;
  const leftButton = document.querySelector(btnLeftSelector);
  const rightButton = document.querySelector(btnRightSelector);
  const slider = document.querySelector(sliderSelector);

  frame.classList.add('frame');
  slider.classList.add('slider');

  //Event listeners when the user clicks on the arrows
  leftButton.addEventListener('click', function () {
    carousel.left();
  });

  rightButton.addEventListener('click', function () {
    carousel.right();
  });

  function moveSlide(value) {
    position += value;
    slider.style.left = position + 'px';
  }

  return {
    right: function () {
      if (position > -3100) {
        moveSlide(-199);
      } else {
        position = slidesNumber - 1;
        slider.style.left = position + 'px';
        pageCarousel = Number(pageCarousel) + 1;
        pageCarousel = pageCarousel + '';
        getUpcomingFilms(pageCarousel);
      }
    },

    left: function () {
      if (position === 0) {
        moveSlide(0);
      } else if (position < 0) {
        moveSlide(200);
      } else {
        position = slidesNumber - 1;
        slider.style.left = position + 'px';
      }
    },
  };
}

const carousel = new Carousel(
  '#frame',
  '#slider',
  '#slider .slide',
  '.arrowLeft',
  '.arrowRight',
);

const getUpcomingFilms = function (pageCarousel) {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${pageCarousel}`,
  )
    .then(list => list.json())
    .then(list => {
      const listRef = document.querySelector('#slider');

      list.results.map(el => {
        listRef.innerHTML += `<div class="slider-box slide">
                  <div class="slider-photo">
                    <a href="#" class="carousel-link">
                      <img src="https://image.tmdb.org/t/p/w200${el.poster_path}" class="img-carousel" />
                    </a>
                    <p class="release-date">Available from</br>"${el.release_date}"</p>
                  </div>`;
      });
    })
    .catch(error => {
      console.log(error);
    });
};

getUpcomingFilms(pageCarousel);

setInterval(() => {
  carousel.right();
}, 3000);
