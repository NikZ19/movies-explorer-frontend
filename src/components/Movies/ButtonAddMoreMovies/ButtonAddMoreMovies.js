import './ButtonAddMoreMovies.css';

function ButtonAddMoreMovies({ handleClickButton }) {
  return (
    <div className='more-movies root__container'>
      <button className='more-movies__button' type='button' onClick={handleClickButton}>Ещё</button>
    </div>
  );

}

export default ButtonAddMoreMovies;
