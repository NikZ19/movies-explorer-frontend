import { Promo } from './Promo/Promo';
import { About } from './About/About';
import { Tech } from './Tech/Tech';
import { Student } from './Student/Student';

function Main(props) {
  return (
    <div className='main'>
      <Promo />
      <About />
      <Tech />
      <Student />
    </div>
  );
}

export default Main;
