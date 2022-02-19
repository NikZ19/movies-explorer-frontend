import Navigation from '../../Navigation/Navigation';
import './PopupMobileMenu.css';

function PopupMobileMenu({ handleClick }) {
  const classNameForClose = ['navigation-menu__link', 'navigation-menu__link-active', 'popup-mobile-menu', 'navigation__profile-btn_menu', 'navigation__profile-text'];
  const handleFieldClick = (e) => {
    classNameForClose.includes(e.target.className) && handleClick()
  }

  return (
    <div className='popup-mobile-menu' onClick={handleFieldClick}>
      <button className='popup-mobile-menu__close' onClick={handleClick}></button>
      <Navigation type='menu'/>
    </div>
  );
}

export default PopupMobileMenu;
