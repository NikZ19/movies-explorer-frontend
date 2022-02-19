import './Title.css';

function Title({ title }) {
  return (
    <div className='title'>
      <h2 className='title__text'>{title}</h2>
    </div>
  );
}

export default Title;
