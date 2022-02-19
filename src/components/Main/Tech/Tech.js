import { techSkills } from '../../../utils/techSkills';
import Label from '../../Label/Label';
import Title from '../../Title/Title';
import './Tech.css';

export function Tech() {
  return (
    <section className='tech' id='tech'>
      <div className='tech__container root__container'>
        <Title title='Технологии' />
        <div className='tech__text-container'>
          <h3 className='tech__title'>7 технологий</h3>
          <p className='tech__info'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className='tech__skills'>
          {techSkills.map(skill => <Label name={skill} type='medium' key={skill.toString()} />)}
        </ul>
      </div>
    </section>
  )
}
