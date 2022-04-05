import './FilterCheckbox.css';

function FilterCheckbox({ switchShortMovie, label }) {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__input' type='checkbox' onClick={switchShortMovie} />
      <span className='filter-checkbox__switch' />
      <p className='filter-checkbox__label'>{label}</p>
    </label>
  );
}

export default FilterCheckbox;
