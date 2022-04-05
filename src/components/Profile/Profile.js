import { useContext, useEffect } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useFormWithValidation from '../../utils/useValidationForm';
import Preloader from '../Preloader/Preloader';

function Profile({ handleLogout, handleButtonEdit, success, serverError, isLoading, resetServerError }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, updateValue } = useFormWithValidation();

  useEffect(() => {
    resetServerError();
  }, []);

  useEffect(() => {
    updateValue('name', currentUser.name);
    updateValue('email', currentUser.email);
  }, [currentUser]);

  const isFormInvalid = !isValid
    || ((values.email === currentUser.email)
      && (values.name === currentUser.name));

  return (
    <section className='profile root__container'>
      <div className='profile__container'>
        <h1 className='profile__greeting'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' id='profile-form'>
          <label className='profile__label'>Имя
            <input className='profile__input'
              name='name'
              type='text'
              value={values.name || ''}
              onChange={handleChange}
              pattern={'[A-Za-zА-Яа-яЁё]+([ -][A-Za-zА-Яа-яЁё]+)?'}
              minLength={2}
              maxLength={30}
              disabled={isLoading}
              required
            />
          </label>
          <label className='profile__label'>E-mail
            <input className='profile__input'
              name='email'
              type='email'
              value={values.email || ''}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </label>
        </form>
        <div className='profile__response-block'>
          {isLoading && <Preloader />}
          {(success || serverError) && (
            <p className={`profile__response-text ${serverError && 'profile__response-text_error'}`}> {success || serverError}</p>
          )}
        </div>
        <div className='profile__buttons'>
          <button className='profile__button profile__button_type_submit'
            form='profile-form'
            onClick={(e) => handleButtonEdit(e, values.name, values.email)}
            disabled={isFormInvalid || isLoading}
          >
            Редактировать
          </button>
          <button className='profile__button profile__button_type_logout'
            type='button'
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section >
  );
}

export default Profile;
