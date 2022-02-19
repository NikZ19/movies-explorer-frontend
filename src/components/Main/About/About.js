import Title from '../../Title/Title';
import './About.css';

export function About() {
  return (
    <section className='about root__container' id='about'>
        <Title title='О проекте' />
        <div className='about__two-columns'>
          <div className='about__column'>
            <h3 className='about__column-title'>Дипломный проект включал 5 этапов</h3>
            <p className='about__column-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='about__column'>
            <h3 className='about__column-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='about__column-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='about__timeline'>
          <span className='about__cell about__cell_type_one-week'>1 неделя</span>
          <span className='about__cell about__cell_type_four-week'>4 недели</span>
          <span className='about__cell about__cell_type_lable'>Back-end</span>
          <span className='about__cell about__cell_type_lable'>Front-end</span>
      </div>
    </section>
  )
}
