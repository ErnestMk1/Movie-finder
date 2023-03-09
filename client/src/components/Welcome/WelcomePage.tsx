import css from './WelcomePage.module.css';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import { useEffect, useState } from 'react';
import TrackVisibilty from 'react-on-screen';

const WelcomePage = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [buttonTrigger, setButtonTrigger] = useState(false);

  useEffect(() => {
    setShowFirst(true);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowSecond(true), 1700);
    setTimeout(() => setButtonTrigger(true), 2300);
  }, [showFirst])

  return (
    <TrackVisibilty>
      {({ isVisible }) =>
        <div className={css.main_div}>
          <h2 className={showFirst && isVisible ? `animate__animated animate__fadeInDownBig ${css.main_div_first_caption}` : `${css.main_div_first_caption} ${css.dnone}`}>Run out of movies to watch?</h2>
          <h1 className={showSecond && isVisible ? `animate__animated animate__zoomIn ${css.main_div_caption}` : `${css.main_div_caption} ${css.dnone}`}>You're in the right place!</h1>

          <button className={buttonTrigger && isVisible ? `${css.button} animate__animated animate__fadeIn` : `${css.button} ${css.dnone}`}>
            Get Recommendations <ArrowRightCircle size={25}/>
          </button>
        </div>
      }
    </TrackVisibilty>
  );
};

export default WelcomePage;
