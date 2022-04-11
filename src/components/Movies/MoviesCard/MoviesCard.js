import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SavedMoviesContext } from '../../../context/SavedMoviesContext';
import { calcDuration } from '../../../utils/calcDuration';
import './MoviesCard.css';

function MoviesCard({ movieData, handleLikeClick, handleRemoveButton }) {

  const isTouchDevice = 'ontouchstart' in window;

  const savedMovies = useContext(SavedMoviesContext);
  const isLiked = savedMovies.find(i => +i.movieId === movieData.id)

  const location = useLocation().pathname;

  const [imageHovered, setImageHovered] = useState(false);

  const handleMouseEnter = () => setImageHovered(true);
  const handleMouseLeave = () => setImageHovered(false);

  return (
    <article className='movie'>
      <a className='movie__link' href={movieData.trailerLink} target='_blank' rel='noopener noreferrer' >
        <img className='movie__image' src={location === '/movies' ? `https://api.nomoreparties.co${movieData.image.url}` : movieData.image.url} alt={`Превью фильма "${movieData.nameRU}"`}
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      </a>
      {isTouchDevice ?
        location === '/movies' ?
          <button className={
            isLiked ?
              'movie__btn movie__btn_type_saved'
              :
              'movie__btn movie__btn_type_save'
          }
            type='button' onClick={() => handleLikeClick(movieData)} onMouseEnter={handleMouseEnter}></button>
          :
          <button className='movie__btn movie__btn_type_remove'
            type='button' onClick={() => handleRemoveButton(movieData)} onMouseEnter={handleMouseEnter}></button>
        :
        location === '/movies' ?
          <button className={
            isLiked && imageHovered ?
              'movie__btn movie__btn_type_remove'
              :
              isLiked ?
                'movie__btn movie__btn_type_saved'
                :
                `movie__btn ${imageHovered && 'movie__btn_type_save'}`
          }
            type='button' onClick={() => handleLikeClick(movieData)} onMouseEnter={handleMouseEnter}></button>
          :
          <button className={`movie__btn ${imageHovered && 'movie__btn_type_remove'}`}
            type='button' onClick={() => handleRemoveButton(movieData)} onMouseEnter={handleMouseEnter}></button>
      }
      <div className='movie__info'>
        <h2 className='movie__title'>{movieData.nameRU}</h2>
        <span className='movie__duration'>{calcDuration(movieData.duration)}</span>
      </div>
    </article>
  );
}

export default MoviesCard;
