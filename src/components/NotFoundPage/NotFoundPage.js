import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(props) {
  const navigate = useNavigate();
  return (
    <section className='not-found'>
      <div className='not-found__error'>
        <p className='not-found__code'>404</p>
        <p className='not-found__message'>Страница не найдена</p>
      </div>
      <button className='not-found__back' onClick={() => navigate(-2)}>Назад</button>
    </section>
  );
}

export default NotFoundPage;
