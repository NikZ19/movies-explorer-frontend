import './Portfolio.css';

function Portfolio(props) {
  return (
<div className='portfolio'>
          <h4 className='portfolio__title'>Портфолио</h4>
          <ul className='portfolio__links-list'>
            <li className='portfolio__item'>
              <a className='portfolio__link' href='https://github.com/NikZ19/how-to-learn' rel='noopener noreferrer' target='_blank'>Статичный сайт</a>
              <span className='portfolio__arrow'>&#8599;</span>
            </li>
            <li className='portfolio__item'>
              <a className='portfolio__link' href='https://github.com/NikZ19/russian-travel' rel='noopener noreferrer' target='_blank'>Адаптивный сайт</a>
              <span className='portfolio__arrow'>&#8599;</span>
            </li>
            <li className='portfolio__item'>
              <a className='portfolio__link' href='https://github.com/NikZ19/mesto' rel='noopener noreferrer' target='_blank'>Одностраничное приложение</a>
              <span className='portfolio__arrow'>&#8599;</span>
            </li>
          </ul>
        </div>
   );
}

export default Portfolio;
