const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = '270f62a3161833b29f3534ef1d18d5a6';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzBmNjJhMzE2MTgzM2IyOWYzNTM0ZWYxZDE4ZDVhNiIsInN1YiI6IjY1NjliMzRmNjM1MzZhMDBjNDJhOTRhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6n_PVw8L5YbP5E4yWe4QgSA4ZnMDGxzBFCiqZdJHBc',
  },
};

export default function fetchTrendingMovie(page) {
  return fetch(
    `${BASE_URL}/3/movie/popular?&append_to_response=configuration&language=uk-UK&page=${page}`,
    options
  ).then(response => {
    // console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
