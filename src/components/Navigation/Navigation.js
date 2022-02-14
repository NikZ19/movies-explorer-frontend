import { Link, NavLink } from 'react-router-dom';
import icon from '../../images/icon_profile.svg';
import './Navigation.css';

function Navigation({ type }) {
  const setActiveMenuLink = ({ isActive }) => isActive ? `navigation-${type}__link-active` : `navigation-${type}__link`;

  return (
    <nav className={`navigation-${type}`}>
      {type === 'header' ?
        <ul className='navigation-header__list'>
          <li className='navigation-header__list-item'>
            <Link className='navigation-header__link' to='/movies'>Фильмы</Link>
          </li>
          <li className='navigation-header__list-item'>
            <Link className='navigation-header__link' to='/saved-movies'>Сохранённые фильмы</Link>
          </li>
          <li className='navigation-header__list-item navigation-header__list-item_with-btn'>
            <Link className='navigation-header__profile-btn' to='/profile'>
              <img className='navigation__profile-icon' src={icon} alt='#' />
              <p className='navigation__profile-text'>Аккаунт</p>
            </Link>
          </li>
        </ul>
        :
        <ul className='navigation-menu__list'>
          <li className='navigation-menu__list-item'>
            <NavLink className={setActiveMenuLink} to='/'>Главная</NavLink>
          </li>
          <li className='navigation-menu__list-item'>
            <NavLink className={setActiveMenuLink} to='/movies'>Фильмы</NavLink>
          </li>
          <li className='navigation-menu__list-item'>
            <NavLink className={setActiveMenuLink} to='/saved-movies' >Сохранённые фильмы</NavLink>
          </li>
          <li className='navigation-menu__list-item'>
            <Link className='navigation-menu__profile-btn' to='/profile'>
              <img className='navigation__profile-icon' src={icon} alt='#' />
              <p className='navigation__profile-text'>Аккаунт</p>
            </Link>
          </li>
        </ul>
      }
    </nav>
  );
}

export default Navigation;
