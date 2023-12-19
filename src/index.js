import { refs } from './js/refs';
import fetchTrendingMovie from './js/fetchTrendingMovie';
import fetchSearchMovie from './js/fetchSearchMovie';
import fetchSelectMovie from './js/fetchSelectMovie';
import createGalleryMarkup from './js/createGalleryMarkup';
import createModalMarkup from './js/createModalMarkup';
import onModalBtnClick from './js/onModalBtnClick';
import loaderModule from './js/loader';
import addScroll from './js/scrollToAnkore';

addScroll();

let page = 1;
let value = '';

let options = {
  root: null,
  rootMargin: '900px',
  threshold: 1.0,
};

refs.jsForm.addEventListener('submit', onSearchBtnClick);

// For trending movies
let trendingObserver = new IntersectionObserver(onLoad, options);

// To search by name
let searchObserver = new IntersectionObserver(onSearchLoad, options);

let trendingLoaded = false;
let searchLoaded = false;
/**
  |============================
  | Request a list of trending movies
  |============================
*/
fetchTrendingMovie(page)
  .then(response => {
    loaderModule.addLoader();
    createGalleryMarkup(response.results);
    trendingObserver.observe(refs.trendingTarget);
  })
  .catch(err => console.error(err))
  .finally(() => {
    loaderModule.removeLoader();
  });

function onLoad(entries, trendingObserver) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !trendingLoaded) {
      trendingLoaded = true;
      page += 1;
      fetchTrendingMovie(page)
        .then(response => {
          loaderModule.addLoader();
          createGalleryMarkup(response.results);
          if (response.total_pages === page) {
            trendingObserver.unobserve(refs.trendingTarget);
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          loaderModule.removeLoader();
          trendingLoaded = false;
        });
    }
  });
}

/**
  |============================
  | Search by name + sxroll
  |============================
*/

function onSearchBtnClick(e) {
  e.preventDefault();
  trendingObserver.unobserve(refs.trendingTarget);
  page = 1;
  value = e.target.elements.name.value.trim();
  if (value === '') {
    refs.search_message.classList.remove('is_hidden');
    setTimeout(() => {
      refs.search_message.classList.add('is_hidden');
    }, 3000);
    return;
  }
  refs.jsGalleryList.innerHTML = '';
  fetchSearchMovie(value, page)
    .then(response => {
      if (response.results.length === 0) {
        refs.search_message.classList.remove('is_hidden');
        setTimeout(() => {
          refs.jsForm.reset();
          refs.search_message.classList.add('is_hidden');
        }, 2000);
        return;
      }
      loaderModule.addLoader();
      createGalleryMarkup(response.results);
      searchObserver.observe(refs.searchTarget);
    })
    .catch(err => console.error(err))
    .finally(() => loaderModule.removeLoader());
}

function onSearchLoad(entries, searchObserver) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !searchLoaded) {
      searchLoaded = true;
      page += 1;
      fetchSearchMovie(value, page)
        .then(response => {
          loaderModule.addLoader();
          createGalleryMarkup(response.results);
          if (response.total_pages === page) {
            searchObserver.unobserve(refs.searchTarget);
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          loaderModule.removeLoader();
          searchLoaded = false;
        });
    }
  });
}

/**
  |============================
  | Request for the selected movie + opening the modal
  |============================
*/

refs.jsGalleryList.addEventListener('click', onFilmClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function onFilmClick(e) {
  e.preventDefault();
  refs.jsModal.innerHTML = '';
  const selectFilmId = e.target.closest('.gallery__film_item').id;
  fetchSelectMovie(selectFilmId)
    .then(response => {
      loaderModule.addLoader();
      onOpenModal();
      createModalMarkup(response);
    })
    .catch(err => console.error(err))
    .finally(() => loaderModule.removeLoader());
}

function onOpenModal() {
  document.body.classList.add('show-modal');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscKeyPress);
  refs.jsModal.addEventListener('click', onModalBtnClick);

  // Делегирование события клика для кнопки закрытия модального окна
  refs.jsModal.addEventListener('click', e => {
    const closeButton = e.target.closest('.close_btn');
    if (closeButton) {
      onCloseModal();
    }
  });
}

function onCloseModal(e) {
  document.removeEventListener('keydown', onEscKeyPress);
  refs.jsModal.removeEventListener('click', onModalBtnClick);
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
