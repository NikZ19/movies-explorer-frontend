import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import Logo from '../Logo/Logo';
import Preloader from '../Preloader/Preloader';
import '../Login/Login.css';

function Register({ isLoggin, isLoading, serverError, resetServerError, handleSubmit }) {
  const name = useInput('', 'name');
  const email = useInput('', 'email');
  const password = useInput('', 'password');

  useEffect(() => {
    resetServerError();
  }, []);

  const isFormInvalid = ((name.inputInvalid || email.inputInvalid || password.inputInvalid) || isLoading);

  return (
    <>
      {isLoggin ? <Navigate to='/movies' />
        :
        <section className='auth root__container'>
          <Logo />
          <h1 className='auth__title'>Добро пожаловать!</h1>
          <form className='auth__form' noValidate>
            <label className='auth__label'>
              Имя
              <input className='auth__input'
                name='name'
                type='text'
                value={name.value}
                onChange={e => name.onChange(e)}
                onBlur={e => name.onBlur(e)}
                disabled={isLoading}
              />
              <span className='auth__error'>
                {name.isDirty && name.currentError}
              </span>
            </label>
            <label className='auth__label'>
              E-mail
              <input className='auth__input'
                name='email'
                type='email'
                value={email.value}
                onChange={e => email.onChange(e)}
                onBlur={e => email.onBlur(e)}
                disabled={isLoading}
              />
              <span className='auth__error'>
                {email.isDirty && email.currentError}
              </span>
            </label>
            <label className='auth__label'>
              Пароль
              <input className='auth__input'
                name='password'
                type='password'
                value={password.value}
                onChange={e => password.onChange(e)}
                onBlur={e => password.onBlur(e)}
                disabled={isLoading}
              />
              <span className='auth__error'>
                {password.isDirty && password.currentError}
              </span>
            </label>
            {serverError && <p className='auth__error auth__error_visible'>{serverError}</p>}
            {isLoading ?
              <Preloader />
              :
              <button className='auth__submit'
                onClick={(e) => handleSubmit(e, name.value, email.value, password.value)}
                disabled={isFormInvalid}
              >
                Зарегистрироваться
              </button>
            }
          </form>
          <span className='auth__caption'>Уже зарегистрированы? <Link className='auth__link' to='/signin'>Войти</Link></span>
        </section>
      }
    </>
  );
}
export default Register;
