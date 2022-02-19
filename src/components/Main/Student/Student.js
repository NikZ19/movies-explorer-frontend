import './Student.css';
import Title from '../../Title/Title';
import photo from '../../../images/photo-me.jpg';
import Portfolio from '../Portfolio/Portfolio';

export function Student() {
  return (
    <section className='student root__container' id='student'>
      <Title title='Студент' />
      <div className='student__biography-container'>
        <div className='student__biography-container-inner'>
          <div className='student__biography'>
            <h3 className='student__name'>Никита</h3>
            <p className='student__about'>Фронтенд-разработчик, 26 лет</p>
            <p className='student__description'>Я родился и живу в Санкт-Петербурге. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
          <div className='student__social-links'>
            <a className='student__social-link' href='https://t.me/ZNikD' rel='noopener noreferrer' target='_blank'>Telegram</a>
            <a className='student__social-link' href='https://github.com/NikZ19' rel='noopener noreferrer' target='_blank'>Github</a>
          </div>
        </div>
        <img className='student__photo' src={photo} alt='#' />
      </div>
      <Portfolio />
    </section>
  )
}
