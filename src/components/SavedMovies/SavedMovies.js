import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

function SavedMovies({ savedMovies }) {
  return (
    <>
      <SearchForm />
      <MoviesCardList movies={savedMovies} />
    </>
  );
}

export default SavedMovies;
