import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useFormWithValidation from '../../utils/useValidationForm';
import Preloader from '../Preloader/Preloader';
import './Form.css';

function Form({ props }) {
  const { isLoading, handleClickButton, serverError, resetServerError } = props;
  const {
    values, handleChange, errors, isValid,
  } = useFormWithValidation();

  const location = useLocation();

  useEffect(() => {
    resetServerError();
  }, []);

  // const [formValues, setFormValues] = useState({
  //   name: '',
  //   email: '',
  //   password: ''
  // });

  // const [formValidity, setFormValidity] = useState({
  //   emailValid: true,
  //   passwordValid: true
  // });

  // const { name, email, password } = formValues;

  // const { emailValid, passwordValid } = formValidity;


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues(prevState => ({ ...prevState, [name]: value }));
  // }
  // шуточная валидация
  // useEffect(() => {
  //   const isEmailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(formValues.email);
  //   const isPasswordValid = formValues.password.length >= 8;

  //   setFormValidity(prevValidity => ({
  //     emailValid: isEmailValid,
  //     passwordValid: isPasswordValid
  //   }))
  // }, [formValues]);
  return (
    <section className='register root__container'>
      <Logo />
      <h1 className='register__title'>{location.pathname === '/signup' ? 'Добро пожаловать!' : 'Рады видеть!'}</h1>
      <form className='register__form'>
        {location.pathname === '/signup' &&
          <label className='register__label'>
            Имя
            <input className='register__input'
              name='name'
              placeholder='Иван'
              type='text'
              value={values.name || ''}
              onChange={handleChange}
              pattern={'[A-zА-яЁё]+([ -][A-zА-яЁё]+)?'}
              minLength={2}
              maxLength={30}
              disabled={isLoading}
              required
            />
          </label>
        }
        <label className='register__label'>
          E-mail
          <input className='register__input'
            name='email'
            placeholder='email@yandex.ru'
            type='email'
            value={values.email || ''}
            onChange={handleChange}
            disabled={isLoading}
            required

          />
        </label>
        <label className='register__label'>
          Пароль
          <input className='register__input'
            name='password'
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            type='password'
            minLength={8}
            value={values.password || ''}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </label>
        {serverError && <p className='register__error register__error_visible'>{serverError}</p>}
        {isLoading ?
          <Preloader />
          :
          <>
            {
              location.pathname === '/signup' ?
                <button className='register__submit' onClick={(e) => handleClickButton(e, values.name, values.email, values.password)} disabled={!isValid || isLoading}>Зарегистрироваться</button>
                :
                <button className='register__submit' onClick={(e) => handleClickButton(e, values.email, values.password)} disabled={!isValid || isLoading}>Войти</button>
            }
          </>
        }
      </form>
      {
        location.pathname === '/signup' ?
          <span className='register__caption'>Уже зарегистрированы? <Link className='register__link' to='/signin'>Войти</Link></span>
          :
          <span className='register__caption'>Ещё не зарегистрированы? <Link className='register__link' to='/signup'>Регистрация</Link></span>
      }
    </section >
  );
}

export default Form;
