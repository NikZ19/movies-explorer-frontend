import './FilterCheckbox.css';

function FilterCheckbox({ onChange, label, defaultChecked }) {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__input' type='checkbox' onChange={onChange} defaultChecked={defaultChecked} />
      <span className='filter-checkbox__switch' />
      <p className='filter-checkbox__label'>{label}</p>
    </label>
  );
}

export default FilterCheckbox;
