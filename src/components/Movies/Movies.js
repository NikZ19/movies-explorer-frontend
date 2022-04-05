import { useEffect, useState } from 'react';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import ButtonAddMoreMovies from './ButtonAddMoreMovies/ButtonAddMoreMovies.js'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { filterMovies, filterShortMovies } from '../../utils/searchFilter';
import useWindowWidth from '../../utils/useWindowWidth';

function Movies({ handleLikeClick }) {
  const windowWidth = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isEnableShortMovies, setIsEnableShortMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const switchShortMovie = () => {
    if (!isEnableShortMovies && movies) {
      const filtered = filterShortMovies(movies);
      setMovies(filtered || []);
    }

    if (isEnableShortMovies && movies) {
      const data = JSON.parse(localStorage.getItem('movies'));
      setMovies(data || []);
    }
    setIsEnableShortMovies((prevState) => !prevState);
  };

  const handleClickButtonAddMore = () => {
    windowWidth >= 1280
      && setCardCount(cardCount + 3);

    windowWidth >= 320
      && windowWidth < 1280 && setCardCount(cardCount + 2);
  };

  useEffect(() => {
    windowWidth >= 1280
      && setCardCount(12);

    windowWidth >= 768
      && windowWidth < 1280 && setCardCount(8);

    windowWidth >= 320
      && windowWidth < 768 && setCardCount(5);
  }, [windowWidth, movies]);

  useEffect(() => {
    const moviesData = localStorage.getItem('movies') !== null
      ? JSON.parse(localStorage.getItem('movies'))
      : [];
    setMovies(moviesData);
  }, []);

  const handleSearchButton = (e) => {
    e.preventDefault();

    setIsLoading(true);
    moviesApi.getAllMovies()
      .then((data) => {
        const filteredMovies = filterMovies(data, searchQuery, isEnableShortMovies);
        filteredMovies.length === 0 && setResponseText('Ничего не найдено.');
        setMovies(filteredMovies);
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
      })
      .catch(() => {
        setMovies([]);
        localStorage.removeItem('movies');
        setResponseText(`Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <SearchForm
        searchQuery={searchQuery}
        handleSearchQuery={(e) => setSearchQuery(e.target.value)}
        handleSearchButton={handleSearchButton}
        isLoading={isLoading}
        switchShortMovie={switchShortMovie}
      />

      {isLoading ? (<Preloader />)
        : movies.length > 0
          ?
          (<MoviesCardList movies={movies.slice(0, cardCount)} handleLikeClick={handleLikeClick} />)
          : (<span className='movies__not-found'>{responseText}</span>)
      }
      {(movies.length > 3) && (cardCount < movies.length)
        && (<ButtonAddMoreMovies handleClickButton={handleClickButtonAddMore} />)}
    </>
  );
}

export default Movies;
