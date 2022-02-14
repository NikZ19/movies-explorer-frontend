import './Logo.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Logo(props) {
  return (
    <Link className='logo-link' to='/'><img className='logo' src={logo} alt='Логотип' /></Link>
  );
}

export default Logo;
