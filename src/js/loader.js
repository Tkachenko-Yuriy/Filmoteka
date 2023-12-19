import { refs } from './refs';

function addLoader() {
  refs.jsLoader.classList.add('loader');
}

function removeLoader() {
  setTimeout(() => {
    refs.jsLoader.classList.remove('loader');
  }, 500);
}

export default {
  addLoader,
  removeLoader,
};
