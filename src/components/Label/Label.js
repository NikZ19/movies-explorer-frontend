import './Label.css';

function Label({ name, type, href }) {
  return (
    <li className={`label label_type_${type}`}>
      {type === 'small' ?
        <a className='label__link' href={href}>{name}</a>
        :
        name
      }
    </li>
  );
}

export default Label;
