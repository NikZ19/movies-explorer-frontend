import Preloader from '../Preloader/Preloader';
import MoreButton from './MoreButton/MoreButton';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies({ movies }) {
  return (
    <>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList movies={movies} />
      <MoreButton />
    </>
  );
}

export default Movies;
