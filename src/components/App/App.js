import { useState } from 'react';
import './App.css';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { Route, Routes, useLocation } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import { moviesList, savedMoviesList } from '../../utils/mockVar';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, setMovies] = useState(moviesList);
  const [savedMovies, setSavedMovies] = useState(savedMoviesList);

  const location = useLocation();
  const pathPageWithFooter = ['/', '/movies', '/saved-movies'];
  const pathPageWithHeader = ['/', '/movies', '/saved-movies', '/profile']
  return (
    <div className='root'>
      {pathPageWithHeader.includes(location.pathname) && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies movies={movies} />} />
        <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} />} />
        <Route path='/profile' element={<Profile name={'Никита'} email={'pepega@ya.ru'} />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      {pathPageWithFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
