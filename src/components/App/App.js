import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import mainApi from '../../utils/MainApi';
import { SavedMoviesContext } from '../../context/SavedMoviesContext';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState({});
  const [successUpdateUser, setSuccessUpdateUser] = useState('');

  const pathPageWithFooter = ['/', '/movies', '/saved-movies'];
  const pathPageWithHeader = ['/', '/movies', '/saved-movies', '/profile'];

  const tokenCheck = () => {
    mainApi.checkIsLogin()
      .then((res) => {
        if (res.isLogin) {
          setLoggedIn(true);
          navigate(location);
        } else {
          setLoggedIn(false);
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then((movies) => setSavedMovies(movies))
        .catch((err) => `Ошибка ${err} при получении сохраненных фильмов`);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((user) => setCurrentUser(user))
        .catch((err) => `Ошибка ${err} при получении данных пользователя`);
    }
  }, [loggedIn]);

  const filterRemovedCard = (movie) => {
    setSavedMovies((savedMovies) => savedMovies.filter((i) => +i.movieId !== +movie.id));
  };

  const handleRemoveCard = (movie) => {
    mainApi.removeMovie(movie.movieId)
      .then(() => {
        filterRemovedCard(movie);
      })
      .catch((err) => `Ошибка ${err} при удалениии фильма из сохраненных`);
  };

  const handleLikeClick = (movieCard) => {
    const movie = savedMovies.find((i) => +i.movieId === movieCard.id);

    if (movie) {
      mainApi.removeMovie(movie._id)
        .then(() => {
          filterRemovedCard(movieCard);
        })
        .catch((err) => `Ошибка ${err} при удалениии фильма из сохраненных`);
    } else {
      mainApi.createMovie(movieCard)
        .then((result) => setSavedMovies([...savedMovies, result]))
        .catch((err) => `Ошибка ${err} при добавлении фильма в сохраненные`);
    }
  };

  const onUpdateUser = (e, name, email) => {
    e.preventDefault();
    setServerError({});
    setIsLoading(true);
    mainApi.updateUserInfo(name, email)
      .then((result) => {
        setSuccessUpdateUser('Данные успешно обновлены!');
        setTimeout(() => setSuccessUpdateUser(''), 2000);
        setServerError({});
        setCurrentUser(result);
      })
      .catch((err) => {
        const textError = err === 'Ошибка: 409' ?
          'Пользователь с таким email уже существует.'
          :
          'При обновлении профиля произошла ошибка.';
        setServerError({ ...serverError, profile: textError });
      })
      .finally(() => setIsLoading(false));
  };

  const onRegister = (name, email, password) => {
    setServerError({});
    mainApi.register(name, email, password)
      .then(() => {
        mainApi.authorize(email, password)
          .then(() => {
            setServerError({});
            setLoggedIn(true);
            navigate('/movies');
          })
          .catch(() => 'При авторизации произошла ошибка');
      })
      .catch((err) => {
        const textError = err === 'Ошибка: 409' ?
          'Пользователь с таким email уже существует'
          :
          'При регистрации пользователя произошла ошибка';
        setServerError({ ...serverError, signUp: textError });
      })
      .finally(() => setIsLoading(false));
  };

  const onLogin = (email, password) => {
    setServerError({});
    mainApi.authorize(email, password)
      .then(() => {
        setServerError({});
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        const textError = err === 'Ошибка: 401' ?
          'Вы ввели неправильный логин или пароль'
          :
          'При авторизации произошла ошибка';
        setServerError({ ...serverError, login: textError });
      })
      .finally(() => setIsLoading(false));
  };

  const handleClickSignInButton = (e, email, password) => {
    e.preventDefault();

    setIsLoading(true);
    onLogin(email, password);
  };

  const handleClickSignUpButton = (e, name, email, password) => {
    e.preventDefault();

    setIsLoading(true);
    onRegister(name, email, password);
  };

  const handleLogout = () => {
    mainApi.signout()
      .then(() => {
        localStorage.removeItem('movies');
        setLoggedIn(false);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const resetServerError = () => setServerError({});

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <SavedMoviesContext.Provider value={savedMovies}>
          {pathPageWithHeader.includes(location.pathname) && <Header loggedIn={loggedIn} />}
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={
              <ProtectedRoute
                isLoggin={loggedIn}
                redirectTo='/'>
                <Movies handleLikeClick={handleLikeClick} />
              </ProtectedRoute>
            } />
            <Route path='/saved-movies' element={
              <ProtectedRoute
                isLoggin={loggedIn}
                redirectTo='/'>
                <SavedMovies handleRemoveCard={handleRemoveCard} />
              </ProtectedRoute>
            } />
            <Route path='/profile' element={
              <ProtectedRoute
                isLoggin={loggedIn}
                redirectTo='/'>
                <Profile
                  handleButtonEdit={onUpdateUser}
                  success={successUpdateUser}
                  serverError={serverError.profile}
                  isLoading={isLoading}
                  resetServerError={resetServerError}
                  handleLogout={handleLogout}
                />
              </ProtectedRoute>
            } />
            <Route path='/signin' element={
              <Login
                handleClickButton={handleClickSignInButton}
                resetServerError={resetServerError}
                isLoading={isLoading}
                serverError={serverError.login}
              />
            } />
            <Route path='/signup' element={
              <Register
                resetServerError={resetServerError}
                serverError={serverError.signUp}
                handleClickButton={handleClickSignUpButton}
                isLoading={isLoading}
              />
            } />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
          {pathPageWithFooter.includes(location.pathname) && <Footer />}
        </SavedMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
