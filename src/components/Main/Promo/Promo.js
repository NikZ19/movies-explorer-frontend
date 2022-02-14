import React from 'react';
import Label from '../../Label/Label';
// import { Link } from 'react-router-dom';
import './Promo.css';


export function Promo() {
  return (
    <section className='promo root__container root__container_promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <nav className='promo__nav-container'>
        <ul className='promo__nav'>
          <Label name='О проекте' type='small' href='#about' />
          <Label name='Технологии' type='small' href='#tech' />
          <Label name='Студент' type='small' href='#student' />
        </ul>
      </nav>
    </section>
  )
}
