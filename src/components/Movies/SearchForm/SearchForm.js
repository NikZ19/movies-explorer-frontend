import { useState } from 'react';
import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {

  const [toggled, setToggled] = useState(true);

  return (
    <div className='search-form root__container'>
      <div className='search-form__container '>
        <span className='search-form__icon'></span>
        <form className='search-form__form '>
          <input className='search-form__input' placeholder='Фильм' required></input>
          <button className='search-form__submit'>Найти</button>
        </form>
        <div className='search-form__checkbox'>
          <FilterCheckbox onChange={(e) => setToggled(e.target.checked)} label='Короткометражки' defaultChecked={toggled} />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
