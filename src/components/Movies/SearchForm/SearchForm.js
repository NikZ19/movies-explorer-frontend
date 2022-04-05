import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ handleSearchButton, handleSearchQuery, searchQuery, isLoading, switchShortMovie }) {

  return (
    <div className='search-form root__container' >
      <div className='search-form__container '>
        <span className='search-form__icon'></span>
        <form className='search-form__form' onSubmit={handleSearchButton}>
          <input className='search-form__input' value={searchQuery} onChange={handleSearchQuery} placeholder={'Фильм'}></input>
          <button className='search-form__submit' disabled={isLoading || !searchQuery}>Найти</button>
        </form>
        <div className='search-form__checkbox'>
          <FilterCheckbox switchShortMovie={switchShortMovie} label='Короткометражки' />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
