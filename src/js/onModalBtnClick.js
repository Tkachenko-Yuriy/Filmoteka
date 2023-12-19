import { refs } from './refs';
import fetchSelectMovie from './fetchSelectMovie';
import createMyLibGalleryMarkup from './createMyLibGalleryMarkup';
import storage from './localStorage';

const watchedKey = 'addToWatched';
const queueKey = 'addToQueue';
let addToWatchedFilms = [];
let addToQueueFilms = [];

export default function onModalBtnClick(e) {
  const button = e.target;
  const addToWatchedBtn = document.querySelector(
    'button[data-action="addToWatched"]'
  );
  const addToQueueBtn = document.querySelector(
    'button[data-action="addToQueue"]'
  );
  if (button.classList.contains('modal__addToWatched_btn')) {
    addToWatchedBtn.setAttribute('disabled', 'true');
    const selectFilmId = e.target.closest('.modal__film_description').id;
    fetchSelectMovie(selectFilmId)
      .then(response => {
        addToWatchedFilms.push(response);
        storage.save(watchedKey, addToWatchedFilms);
      })
      .catch(err => console.error(err));
  } else if (button.classList.contains('modal__addToQueue_btn')) {
    addToQueueBtn.setAttribute('disabled', 'true');
    const selectFilmId = e.target.closest('.modal__film_description').id;
    fetchSelectMovie(selectFilmId)
      .then(response => {
        addToQueueFilms.push(response);
        storage.save(queueKey, addToQueueFilms);
      })
      .catch(err => console.error(err));
  } else if (button.classList.contains('modal__remove_btn')) {
    const selectFilmId = e.target.closest('.modal__film_description').id;
    if (refs.headerWatchedBtn.hasAttribute('disabled')) {
      const filteredFilm = storage
        .load(watchedKey)
        .filter(el => el.id !== Number(selectFilmId));
      storage.save(watchedKey, filteredFilm);
      handleBtn();
      const loadStorage = storage.load(watchedKey);
      createMyLibGalleryMarkup(loadStorage);
    }
    if (refs.headerQueueBtn.hasAttribute('disabled')) {
      const filteredFilm = storage
        .load(queueKey)
        .filter(el => el.id !== Number(selectFilmId));
      storage.save(queueKey, filteredFilm);
      handleBtn();
      const loadStorage = storage.load(queueKey);
      createMyLibGalleryMarkup(loadStorage);
    }
  }
}

function handleBtn() {
  document.body.classList.remove('show-modal');
  document.body.classList.remove('no-scroll');
        refs.jsGalleryList.innerHTML = '';
}
