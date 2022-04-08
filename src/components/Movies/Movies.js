import { useEffect, useState } from 'react';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import ButtonAddMoreMovies from './ButtonAddMoreMovies/ButtonAddMoreMovies.js'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { filterMovies, filterShortMovies } from '../../utils/searchFilter';
import useWindowWidth from '../../hooks/useWindowWidth';
import {
  MOBILE_WIDTH,
  TABLET_WIDTH,
  DESKTOP_WIDTH,
  NUMBER_OF_CARDS_FOR_MOBILE,
  NUMBER_OF_CARDS_FOR_TABLET,
  NUMBER_OF_CARDS_FOR_DESKTOP,
  NUMBER_OF_CARDS_TO_BE_ADDED_ON_MOBILE,
  NUMBER_OF_CARDS_TO_BE_ADDED_ON_DESKTOP
} from '../../utils/const';

function Movies({ handleLikeClick }) {
  const windowWidth = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isEnableShortMovies, setIsEnableShortMovies] = useState(JSON.parse(localStorage.getItem('toggleState')) || false);
  const [searchQuery, setSearchQuery] = useState('');

  const switchShortMovie = () => {
    if (!isEnableShortMovies && movies) {
      const filtered = filterShortMovies(movies);
      setMovies(filtered || []);
    }

    if (isEnableShortMovies && movies) {
      try {
        const { movies } = JSON.parse(localStorage.reqData);
        setMovies(movies);
      } catch {
        setMovies([]);
      }
    }
    setIsEnableShortMovies((prevState) => !prevState);
  };

  const handleClickButtonAddMore = () => {
    windowWidth >= DESKTOP_WIDTH
      && setCardCount(cardCount + NUMBER_OF_CARDS_TO_BE_ADDED_ON_DESKTOP);

    windowWidth >= MOBILE_WIDTH
      && windowWidth < DESKTOP_WIDTH && setCardCount(cardCount + NUMBER_OF_CARDS_TO_BE_ADDED_ON_MOBILE);
  };

  useEffect(() => {
    windowWidth >= DESKTOP_WIDTH
      && setCardCount(NUMBER_OF_CARDS_FOR_DESKTOP);

    windowWidth >= TABLET_WIDTH
      && windowWidth < DESKTOP_WIDTH && setCardCount(NUMBER_OF_CARDS_FOR_TABLET);

    windowWidth >= MOBILE_WIDTH
      && windowWidth < TABLET_WIDTH && setCardCount(NUMBER_OF_CARDS_FOR_MOBILE);
  }, [windowWidth, movies]);

  useEffect(() => {
    if (localStorage.reqData) {
      const { movies, searchQuery } = JSON.parse(localStorage.getItem('reqData'));
      const toggleState = JSON.parse(localStorage.getItem('toggleState'));
      setIsEnableShortMovies(toggleState);
      setSearchQuery(searchQuery);
      (!isEnableShortMovies) ?
        setMovies(movies)
        :
        setMovies(filterShortMovies(movies) || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toggleState', isEnableShortMovies);
  }, [isEnableShortMovies]);

  const handleSetMovies = () => {
    const filteredMovies = filterMovies(JSON.parse(localStorage.getItem('movies')), searchQuery);
    filteredMovies.length === 0 && setResponseText('Ничего не найдено.');
    localStorage.setItem('reqData', JSON.stringify({ movies: filteredMovies, searchQuery: searchQuery }));
    (!isEnableShortMovies) ?
      setMovies(filteredMovies)
      :
      setMovies(filterShortMovies(filteredMovies) || []);
  }

  const handleSearchButton = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!localStorage.movies) {
      moviesApi.getAllMovies()
        .then((data) => {
          localStorage.setItem('movies', JSON.stringify(data));
          handleSetMovies();
        })
        .catch(() => {
          localStorage.removeItem('movies');
          setResponseText(`Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.`);
        })
        .finally(() => setIsLoading(false));
    } else {
      handleSetMovies();
      setIsLoading(false);
    }
  }

  return (
    <>
      <SearchForm
        searchQuery={searchQuery}
        handleSearchQuery={(e) => setSearchQuery(e.target.value)}
        handleSearchButton={handleSearchButton}
        isLoading={isLoading}
        isActiveCheckbox={isEnableShortMovies}
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
