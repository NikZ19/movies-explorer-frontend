import { useState } from 'react';
import './Profile.css';

function Profile({ name, email }) {
  const [inputName, setInputName] = useState(name);
  const [inputEmail, setInputEmail] = useState(email);

  return (
    <section className='profile root__container'>
      <div className='profile__container'>
        <h1 className='profile__greeting'>Привет, {name}!</h1>
        <form className='profile__form' id='profile-form'>
          <label className='profile__label'>Имя
            <input className='profile__input' name='input-name' onChange={(e) => setInputName(e.target.value)} value={inputName} type='text' />
          </label>
          <label className='profile__label'>E-mail
            <input className='profile__input' name='input-email' onChange={(e) => setInputEmail(e.target.value)} value={inputEmail} type='email' />
          </label>
        </form>

        <div className='profile__buttons'>
          <button className='profile__button profile__button_type_submit' form='profile-form'>Редактировать</button>
          <button className='profile__button profile__button_type_logout' type='button'>Выйти из аккаунта</button>
        </div>

      </div>
    </section>
  );
}

export default Profile;
