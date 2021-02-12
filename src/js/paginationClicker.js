'use strict';
let buttonsNumbers = [-1, 0, 1, 2, 3];

clickerInit();
function clickerInit() {
  document.querySelector('.pagination').addEventListener('click', element => {
    switch (element.target.dataset.index) {
      case 'left':
        buttonsNumbers = previousPage(buttonsNumbers);
        renderNumbers(buttonsNumbers);
        paginationNavigation(buttonsNumbers);
        scrollToSectionHomePage();
        dischargeHeaderError();
        break;

      case 'right':
        buttonsNumbers = nextPage(buttonsNumbers);
        renderNumbers(buttonsNumbers);
        paginationNavigation(buttonsNumbers);
        scrollToSectionHomePage();
        dischargeHeaderError();
        break;

      case '1':
        buttonsNumbers = previousTwoPage(buttonsNumbers);
        renderNumbers(buttonsNumbers);
        paginationNavigation(buttonsNumbers);
        scrollToSectionHomePage();
        dischargeHeaderError();
        break;

      case '2':
        buttonsNumbers = previousPage(buttonsNumbers);
        renderNumbers(buttonsNumbers);
        paginationNavigation(buttonsNumbers);
        scrollToSectionHomePage();
        dischargeHeaderError();
        break;

      case '3':
        buttonsNumbers = nextPage(buttonsNumbers);
        renderNumbers(buttonsNumbers);
        paginationNavigation(buttonsNumbers);
        scrollToSectionHomePage();
        dischargeHeaderError();
        break;

      case '4':
        buttonsNumbers = nextPage(buttonsNumbers);
        renderNumbers(buttonsNumbers);
        paginationNavigation(buttonsNumbers);
        scrollToSectionHomePage();
        dischargeHeaderError();
        break;

      case '5':
        buttonsNumbers = nextTwoPage(buttonsNumbers);
        renderNumbers(buttonsNumbers);
        paginationNavigation(buttonsNumbers);
        scrollToSectionHomePage();
        dischargeHeaderError();
        break;
    }
    if (Number(buttonThreeRef.textContent) > 1) {
      buttonLeftRef.classList.remove('pagination__button_disabled');
      buttonTwoRef.classList.remove('pagination__button_is-hidden');
    } else {
      buttonLeftRef.classList.add('pagination__button_disabled');
      buttonTwoRef.classList.add('pagination__button_is-hidden');
    }
    if (Number(buttonThreeRef.textContent) > 2) {
      buttonOneRef.classList.remove('pagination__button_is-hidden');
    } else {
      buttonOneRef.classList.add('pagination__button_is-hidden');
    }
  });
}
function renderNumbers(newButtonsNumbers) {
  Array.from(document.querySelectorAll('.pagination__number')).forEach(
    (e, i) => {
      e.textContent = newButtonsNumbers[i];
      if (e.textContent < 1) {
        e.textContent = '';
        e.classList.add('pagination__button_disabled');
      } else {
        e.classList.remove('pagination__button_disabled');
      }
    },
  );
}
function nextPage(buttonsNumbers) {
  return buttonsNumbers.map(e => {
    return e + 1;
  });
}
function nextTwoPage(buttonsNumbers) {
  return buttonsNumbers.map(e => {
    return e + 2;
  });
}
function previousPage(buttonsNumbers) {
  return buttonsNumbers.map(e => {
    return e - 1;
  });
}
function previousTwoPage(buttonsNumbers) {
  return buttonsNumbers.map(e => {
    return e - 2;
  });
}
function dischargePaginationAndCreateMarkup() {
  buttonLeftRef.classList.add('pagination__button_disabled');
  buttonOneRef.classList.add('pagination__button_is-hidden');
  buttonTwoRef.classList.add('pagination__button_is-hidden');

  buttonsNumbers = [-1, 0, 1, 2, 3];
  renderNumbers(buttonsNumbers);
  paginationNavigation(buttonsNumbers);
}
function scrollToSectionHomePage() {
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  mediaQuery.addListener(handleTabletChange);
  handleTabletChange(mediaQuery);

  function handleTabletChange(e) {
    if (e.matches) {
      window.scrollTo({
        top: 240,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 670,
        behavior: 'smooth',
      });
    }
  }
}

function dischargeHeaderError() {
  if (
    headerError.textContent ===
    'No movies were found. Please specify your request'
  ) {
    inputValue = '';
    searchField.reset();
  }
}
