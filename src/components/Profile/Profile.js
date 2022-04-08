import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useInput } from '../../hooks/useInput';
import Preloader from '../Preloader/Preloader';
import './Profile.css';

function Profile({ handleLogout, handleButtonEdit, success, serverError, isLoading, resetServerError }) {
  const currentUser = useContext(CurrentUserContext);

  const name = useInput('', 'name');
  const email = useInput('', 'email');

  useEffect(() => {
    resetServerError();
  }, []);

  useEffect(() => {
    name.updateValue(currentUser.name);
    email.updateValue(currentUser.email);
  }, [currentUser]);

  const isFormInvalid = (((email.value === currentUser.email) && (name.value === currentUser.name)) || (name.inputInvalid || email.inputInvalid) || isLoading);

  return (
    <section className='profile root__container'>
      <div className='profile__container'>
        <h1 className='profile__greeting'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' id='profile-form' noValidate>
          <label className='profile__label'>
            Имя
            <input className='profile__input'
              name='name'
              type='text'
              value={name.value}
              onChange={e => name.onChange(e)}
              onBlur={e => name.onBlur(e)}
              disabled={isLoading}
            />
          </label>
          <span className='profile__input-error'>
            {name.isDirty && name.currentError}
          </span>
          <label className='profile__label'>
            E-mail
            <input className='profile__input'
              name='email'
              type='email'
              value={email.value}
              onChange={e => email.onChange(e)}
              onBlur={e => email.onBlur(e)}
              disabled={isLoading}
            />
          </label>
          <span className='profile__input-error'>
            {email.isDirty && email.currentError}
          </span>
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
            onClick={(e) => handleButtonEdit(e, name.value, email.value)}
            disabled={isFormInvalid}
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
    </section>
  );
}

export default Profile;
