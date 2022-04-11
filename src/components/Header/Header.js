import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import PopupMobileMenu from '../Popups/PopupMobileMenu/PopupMobileMenu';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMenuIsOpen(false);
  }, [props.loggedIn])

  const handleClick = () => {
    if (!menuIsOpen) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  }

  return (
    <header className='header root__container'>
      <div className='header__container'>
        <Logo />
        {props.loggedIn ?
          <Navigation type='header' />
          :
          <div className='header__logged-out'>
            <Link className='header__link' to='/signup'>Регистрация</Link>
            <Link className='header__link header__link_style_login' to='signin'>Войти</Link>
          </div>
        }
        {props.loggedIn &&
          <button className='header__menu-btn' onClick={handleClick} type='button'></button>
        }
      </div>
      {menuIsOpen && <PopupMobileMenu handleClick={handleClick} />}
    </header>
  )
}

export default Header;
