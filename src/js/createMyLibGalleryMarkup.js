import { refs } from './refs';
import plug_img from "../images/plug_img.jpg"

export default function createMyLibGalleryMarkup(results) {
  const markup = results
    .map(({ genres, id, poster_path, title, release_date }) => {
      let genresFilm = genres
        .map(obj => obj.name)
        .slice(0, 3)
        .join(',');
          const poster = poster_path !== null ?  `https://image.tmdb.org/t/p/w500/${poster_path}` : plug_img;
        return `<li id="${id}" class="gallery__film_item">
                  <a href="" class="gallery__film_link">
                    <div class="thumb">
                      <img class="gallery__film_poster" loading="lazy" src="${poster}" alt=""   />
                    </div>
                    <div class="description">
                      <h3 class="description-title link">${title}</h3>
                      <p class="description-text">${release_date}</p>
                      <p class="description-text">${genresFilm}</p>
                    </div>
                  </a>
                </li>`;
    })
    .join('');
  refs.jsGalleryList.insertAdjacentHTML('beforeend', markup);
}
