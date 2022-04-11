import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, ...props }) {
  return (
    <section className='movies root__container'>
      <div className='movies__list'>
        {movies.map(movie => {
          return <MoviesCard  movieData={movie} key={movie.id} {...props}/>
        })}
      </div>

    </section>
  );
}

export default MoviesCardList;
