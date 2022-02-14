import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies }) {
  return (
    <section className='movies root__container'>
      <div className='movies__list'>
        {movies.map(movie => {
          return <MoviesCard image={`https://api.nomoreparties.co${movie.image.url}`} title={movie.nameRU} duration={movie.duration} trailerLink={movie.trailerLink} key={movie.id} />
        })}
      </div>

    </section>
  );
}

export default MoviesCardList;
