import { refs } from './refs';
import { genresData } from './genresData.js';
import plug_img from "../images/plug_img.jpg"

export default function createGalleryMarkup(results) {
   const markup = results
    .map(({ genre_ids, id, poster_path, title, release_date }) => {

      const poster = poster_path !== null ?  `https://image.tmdb.org/t/p/w500/${poster_path}` : plug_img;
      let genres = genresData
        .filter(obj => genre_ids.includes(obj.id))
        .map(obj => obj.name)
        .slice(0, 3)
        .join(',');
      return `<li id="${id}" class="gallery__film_item">
          <a href="" class="gallery__film_link">
            <div class="thumb">
            <img class="gallery__film_poster" loading="lazy" src="${poster}"
            "alt="${title}"   />
            </div>
            <div class="description">
              <h3 class="description-title link">${title}</h3>
              <p class="description-text">${release_date}</p>
              <p class="description-text">${genres}</p>
            </div>
          </a>
        </li>`;
    })
    .join('');
  refs.jsGalleryList.insertAdjacentHTML('beforeend', markup);
}
