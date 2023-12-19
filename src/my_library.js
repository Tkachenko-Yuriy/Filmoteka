import { refs } from './js/refs';
import createMyLibGalleryMarkup from './js/createMyLibGalleryMarkup';
import fetchSelectMovie from './js/fetchSelectMovie';
import createMyLibModalMarkup from './js/createMyLibModalMarkup';
import onModalBtnClick from './js/onModalBtnClick';
import storage from './js/localStorage';
import loaderModule from './js/loader';
import addScroll from './js/scrollToAnkore';

addScroll()

const watchedKey = 'addToWatched';
const queueKey = 'addToQueue';

refs.headerWatchedBtn.addEventListener('click', onWatchedBtnClick);
refs.headerQueueBtn.addEventListener('click', onQueueBtnClick);

if (refs.myLib.classList.contains('current_page')) {
  onWatchedBtnClick();
}

function onWatchedBtnClick() {
  handlWatchedBtn();
  const loadStorage = storage.load(watchedKey);
  createMyLibGalleryMarkup(loadStorage);
}
function onQueueBtnClick() {
  handlQueueBtn();
  const loadStorage = storage.load(queueKey);
  createMyLibGalleryMarkup(loadStorage);
}

/**
  |============================
  | Modal
  |============================
*/

refs.jsGalleryList.addEventListener('click', onFilmClick);

function onFilmClick(e) {
  e.preventDefault();
  refs.jsModal.innerHTML = '';
  const selectFilmId = e.target.closest('.gallery__film_item').id;
  fetchSelectMovie(selectFilmId)
    .then(response => {
      loaderModule.addLoader();
      onOpenModal();
      createMyLibModalMarkup(response);
    })
    .catch(err => console.error(err))
    .finally(() => loaderModule.removeLoader());
}

function onOpenModal() {
  document.body.classList.add('show-modal');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.addEventListener('click', onBackdropClick);
  refs.jsModal.addEventListener('click', onModalBtnClick);
  refs.jsModal.addEventListener('click', e => {
    const closeButton = e.target.closest('.close_btn');
    if (closeButton) {
      onCloseModal();
    }
  });
}

function onCloseModal() {
  document.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
  document.body.classList.remove('no-scroll');
}

function onBackdropClick(e) {
  const isTrue = e.currentTarget === e.target;
  if (isTrue) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;
  if (isEscKey) {
    onCloseModal();
  }
}

function handlWatchedBtn() {
  refs.headerWatchedBtn.setAttribute('disabled', 'true');
  refs.headerQueueBtn.removeAttribute('disabled');
  refs.headerWatchedBtn.classList.add('active_btn');
  refs.headerQueueBtn.classList.remove('active_btn');
  refs.jsGalleryList.innerHTML = '';
}

function handlQueueBtn() {
  refs.headerQueueBtn.setAttribute('disabled', 'true');
  refs.headerWatchedBtn.removeAttribute('disabled');
  refs.headerWatchedBtn.classList.remove('active_btn');
  refs.headerQueueBtn.classList.add('active_btn');
  refs.jsGalleryList.innerHTML = '';
}
