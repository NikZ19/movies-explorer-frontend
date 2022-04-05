export const filterShortMovies = (data) => data.filter((movie) => movie.duration <= 40);

export const filterMovies = (data, value, isShortFilm) => data.filter((movie) => {
  const searched = movie.nameRU.toLowerCase().includes(value.trim().toLowerCase());
  return isShortFilm ? searched && (movie.duration <= 40) : searched;
});
