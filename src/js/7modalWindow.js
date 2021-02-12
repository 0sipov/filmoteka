const FOCUSABLE_SELECTORS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

const openModalBtn = document.querySelector('.open-modal');

// elements for block
const main = document.querySelector('main');
const header = document.querySelector('header');
const html = document.documentElement;

// variables

let modal, closeModalBtn, modalCollaboratorsList, shadow, timeout;
let scrollPosition = window.pageYOffset;

function scrollPositionOnOpen() {
  scrollPosition = window.pageYOffset;
  html.style.top = -scrollPosition + 'px';
}

function scrollPositionOnClose() {
  html.classList.remove('modal__opened');
  window.scrollTo(0, scrollPosition);
  html.style.top = '';
}

function fetchFilmModal(film) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false&query=${film}`,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

function modalCollaboratorFilm(e) {
  if (!e.target.classList.contains('modal-card_btn_text')) {
    return;
  }

  const film = e.target.textContent || 'alibi.com';
  fetchFilmModal(film)
    .then(({ results }) => {
      // modal.style.zIndex = 1;
      // shadow.style.zIndex = 0;
      console.log('RESULTS ', results[0]);
      openMovieDetails(results[0]);
    })
    .catch(e => `ERROR ${e}`);
}

function focusCatcher(element) {
  const focusableElements = element.querySelectorAll(FOCUSABLE_SELECTORS);
  focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
}

function focusSet(element) {
  const focusableElements = element.querySelectorAll(FOCUSABLE_SELECTORS);
  focusableElements.forEach(el => el.removeAttribute('tabindex'));
}

function trapScreenReaderFocus(element) {
  element.removeAttribute('aria-hidden');
  main.setAttribute('aria-hidden', 'true');
  header.setAttribute('aria-hidden', 'true');
}

function untrapScreenReaderFocus(element) {
  element.setAttribute('aria-hidden', 'true');
  main.removeAttribute('aria-hidden');
  header.removeAttribute('aria-hidden');
}

function bodyScrollControlShift() {
  let marginSize = window.innerWidth - html.clientWidth;
  if (marginSize) {
    html.style.marginRight = marginSize + 'px';
    return;
  }
  html.style.marginRight = '';
}

function onOverlayClickClose(e) {
  const wrap = e.target.classList.contains('modal-wrap');
  if (!wrap) return;
  e.preventDefault();
  closeModalWindow();
}

function onEscapeClose(e) {
  if (e.which == 27 && modal.classList.contains('modal--active')) {
    e.preventDefault();
    closeModalWindow();
    return;
  }
}

function markup(objectsArray, templateFunction) {
  let markup = objectsArray.reduce((acc, e) => {
    let item = templateFunction(e);
    acc += item;
    return acc;
  }, '');
  return markup;
}

const cursorHandler = {
  currentElem: null,
  mouseCursor: document.getElementById('cursor'),

  onmouseover: function (event) {
    let target = event.target.closest('button') || event.target.closest('a');
    if (!target) return;
    if (!body.contains(target)) return;
    this.currentElem = target;
    mouseCursor.classList.add('cursor');
    mouseCursor.classList.remove('cursor-n');
    body.classList.add('cursor-none');
  },

  onmouseout: function (event) {
    if (!this.currentElem) return;
    let relatedTarget = event.relatedTarget;
    while (relatedTarget) {
      if (relatedTarget == !this.currentElem) return;
      relatedTarget = relatedTarget.parentNode;
    }

    cursorHandler.onclose();
    // mouseCursor.classList.remove('cursor');
    // mouseCursor.classList.add('cursor-n');
    // body.classList.remove('cursor-none');
    this.currentElem = null;
  },

  onclose: function () {
    mouseCursor.classList.remove('cursor');
    mouseCursor.classList.add('cursor-n');
    body.classList.remove('cursor-none');
  },

  mousemove: function (event) {
    mouseCursor.style.top = event.pageY + scrollPosition + 'px';
    mouseCursor.style.left = event.pageX + 'px';
  },
};

function shadowShow() {
  if (shadow) {
    return;
  }

  shadow = document.createElement('div');
  shadow.classList.add('modal__shadow');
  document.body.appendChild(shadow);
}

function openModalWindow() {
  document.body.insertAdjacentHTML('beforeend', createModalWindow());
  modal = document.querySelector('.modal');
  closeModalBtn = document.querySelector('.close-modal');
  modalCollaboratorsList = document.querySelector('.modal-our_team_list');
  modalCollaboratorsList.insertAdjacentHTML(
    'beforeend',
    markup(collaborators, renderCollaboratorCard),
  );
  timeout = setTimeout(() => {
    modal.classList.add('modal--active');
  }, 500);

  shadowShow();

  window.removeEventListener('mousemove', cursor);
  window.addEventListener('mousemove', cursorHandler.mousemove);
  modal.addEventListener('mouseover', cursorHandler.onmouseover);
  modal.addEventListener('mouseout', cursorHandler.onmouseout);
  cursorHandler.onclose();

  if (toTopBtn) {
    toTopBtn.classList.remove('show');
  }

  focusCatcher(html);
  getStorage();

  closeModalBtn.addEventListener('click', closeModalWindow);
  document.addEventListener('click', onOverlayClickClose);
  window.addEventListener('keydown', onEscapeClose);
  openModalBtn.removeEventListener('click', openModalWindow);
  modalCollaboratorsList.addEventListener('click', modalCollaboratorFilm);
  modal.querySelector(FOCUSABLE_SELECTORS).focus();
  focusSet(modal);

  bodyScrollControlShift();
  scrollPositionOnOpen();

  html.classList.add('modal__opened');
  // Trap the screen reader focus as well with aria roles. This is much easier as our main and modal elements are siblings, otherwise you'd have to set aria-hidden on every screen reader focusable element not in the modal.
  trapScreenReaderFocus(modal);
}

function closeModalWindow() {
  // hide the modal
  modal.classList.add('modal--moved');
  modal.addEventListener('transitionend', transitionClose);
  modal.classList.remove('modal--active');
  closeModalBtn.removeEventListener('click', closeModalWindow);
}

function transitionClose() {
  modal.classList.remove('modal--moved');
  modalCollaboratorsList.innerHTML = '';

  modal.removeEventListener('transitionend', transitionClose);
  document.removeEventListener('click', onOverlayClickClose);
  window.removeEventListener('keydown', onEscapeClose);
  modalCollaboratorsList.removeEventListener('click', modalCollaboratorFilm);

  window.removeEventListener('mousemove', cursorHandler.mousemove);
  modal.removeEventListener('mouseover', cursorHandler.onmouseover);
  modal.removeEventListener('mouseout', cursorHandler.onmouseout);
  cursorHandler.onclose();
  window.addEventListener('mousemove', cursor);

  openModalBtn.addEventListener('click', openModalWindow);
  focusSet(html);
  bodyScrollControlShift();
  scrollPositionOnClose();
  // Untrap screen reader focus
  untrapScreenReaderFocus(modal);
  // restore focus to the triggering element
  openModalBtn.focus();
  body.removeChild(modal);
  body.removeChild(shadow);
  clearTimeout(timeout);
  shadow = null;
  modal = null;
  timeout = null;
}

openModalBtn.addEventListener('click', openModalWindow);
