import './Footer.css';

function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <section className='footer root__container'>
      <p className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__date'>&#169; {year}</p>
        <ul className='footer__links-list'>
          <li className='footer__list-item'>
            <a className='footer__link' href='https://practicum.yandex.ru' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a>
          </li>
          <li className='footer__list-item'>
            <a className='footer__link' href='https://github.com/NikZ19' target='_blank' rel='noopener noreferrer'>Github</a>
          </li>
          <li className='footer__list-item'>
            <a className='footer__link' href='https://t.me/ZNikD' target='_blank' rel='noopener noreferrer'>Telegram</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
export default Footer;
