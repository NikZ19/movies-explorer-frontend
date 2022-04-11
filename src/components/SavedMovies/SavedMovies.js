import { useContext, useEffect, useState } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { SavedMoviesContext } from '../../context/SavedMoviesContext';
import { filterMovies, filterShortMovies } from '../../utils/searchFilter';

function SavedMovies({ handleRemoveCard }) {
  const savedMovies = useContext(SavedMoviesContext);
  const [dataMovies, setDataMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isSwitchShortMovie, setIsSwitchShortMovie] = useState(false);

  const newKeysForMovies = () => savedMovies.map((movie) => ({
    id: movie.movieId,
    image: {
      url: movie.image,
    },
    nameRU: movie.nameRU,
    duration: movie.duration,
    trailerLink: movie.trailer,
    movieId: movie._id,
  }));

  const switchShortMovie = () => {
    if (!isSwitchShortMovie && dataMovies) {
      const filtered = filterShortMovies(dataMovies);
      setDataMovies(filtered);
    }

    if (isSwitchShortMovie && dataMovies) {
      const data = newKeysForMovies(savedMovies);
      setDataMovies(data.reverse());
    }

    setIsSwitchShortMovie((prevState) => !prevState);
  };

  useEffect(() => {
    const data = newKeysForMovies();
    setDataMovies(data.reverse());
  }, [savedMovies]);

  const handleSearchButton = (e) => {
    e.preventDefault();

    const data = newKeysForMovies();
    const filteredMovies = filterMovies(data, searchQuery, isSwitchShortMovie);
    setResponseText(filteredMovies.length === 0 && 'Ничего не найдено.');
    setDataMovies(filteredMovies.reverse());
  };

  return (
    <>
      <SearchForm
        isLoading={false}
        searchQuery={searchQuery}
        handleSearchQuery={(e) => setSearchQuery(e.target.value)}
        switchShortMovie={switchShortMovie}
        handleSearchButton={handleSearchButton}
      />
      {responseText
        ? (<span className='movies__not-found'>{responseText}</span>)
        : (<MoviesCardList
          handleRemoveButton={handleRemoveCard}
          isSaved
          movies={dataMovies} />)
      }
    </>
  );
}

export default SavedMovies;
