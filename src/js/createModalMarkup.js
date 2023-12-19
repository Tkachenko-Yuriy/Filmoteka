import { refs } from './refs';
import iconClosePath from "../images/close_x.svg"
import plug_img from "../images/plug_img.jpg"

export default function createModalMarkup(response) {
  const genres = response.genres
    .map(el => el.name)
    .slice(0, 2)
    .join(',');
    
  const videos = response.videos.results;
  let isVideo = '';
  let key = '';
  if (videos.length >= 1) {
    key = `${videos[0].key}`;
  } else {
    key = '';
    isVideo = 'is_hidden'
  }

  const {
    id,
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
  } = response;

  const videoLink = videos.length >= 1 ? `href=https://www.youtube.com/watch?v=${key}` : ``;
  const poster = poster_path !== null ? `https://image.tmdb.org/t/p/w500/${poster_path}` : plug_img;
  
  const markup = `<div class="modal__body"> 
                    <div class="modal__film_poster ">
                      <a class="modal__film_poster_link" ${videoLink} target="_blank">
                        <img class="modal__film_img img" src="${poster}" alt="${title}" width="280" height="398">
                        <span class="watch-icon ${isVideo}"></span>
                      </a>
                    </div>
                    <div id="${id}" class="modal__film_description">
                      <h2 class="modal__film_title">${title}</h2>
                      <div class="modal__film_configuration">
                      <ul class="modal__film_configuration_list list">
                        <li class="modal__film_configuration_item">Рейтинг</li>
                        <li class="modal__film_configuration_item">Популярність</li>
                        <li class="modal__film_configuration_item">Назва</li>
                        <li class="modal__film_configuration_item">Жанр</li>
                      </ul>
                      <ul class="modal__film_configuration_list_value list">
                        <li class="modal__film_configuration_item"><span class="configuration__vote_averagee_value">${vote_average}</span>&#x02F;<span class="configuration__vote_count_value">${vote_count}</span></li>
                        <li class="modal__film_configuration_item">${popularity}</li>
                        <li class="modal__film_configuration_item">${title}</li>
                        <li class="modal__film_configuration_item">${genres}</li>
                      </ul>
                    </div>
                      <h3 class="modal__film_second_title">Опис</h3>
                      <p class="modal__film_overview">${overview}</p>
                      <ul class="modal__btn list">
                        <li><button type="button" class="modal__addToWatched_btn button active_btn"  data-action="addToWatched">
                          додати в переглянуті
                        </button></li>
                        <li><button type="button" class="modal__addToQueue_btn button" data-action="addToQueue">
                          додати в чергу
                        </button></li>
                      </ul>
                    </div>
                        <button type="button" class="close_btn" data-action="close-modal">
                          <img class="close-icon" src=${iconClosePath} alt="">
                        </button>
                        <span class="js-loader"></span>
                  </div>`;

  refs.jsModal.insertAdjacentHTML('afterbegin', markup);
}
