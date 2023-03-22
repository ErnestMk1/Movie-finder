import css from './WelcomePage.module.css';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from "react-router-dom";

const WelcomePage = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [buttonTrigger, setButtonTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowFirst(true);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowSecond(true), 1700);
    setTimeout(() => setButtonTrigger(true), 2300);
  }, [showFirst])

  const onBtnClick = () => {
    navigate(generatePath('/movies'));
  };

  return (
    <div className={css.main_div}>
      <h2 className={showFirst ? `animate__animated animate__fadeInDownBig ${css.main_div_first_caption}` : `${css.main_div_first_caption} ${css.dnone}`}>Run out of movies to watch?</h2>
      <h1 className={showSecond ? `animate__animated animate__zoomIn ${css.main_div_caption}` : `${css.main_div_caption} ${css.dnone}`}>You're in the right place!</h1>

      <button
        onClick={onBtnClick}
        className={buttonTrigger ? `${css.button} animate__animated animate__fadeIn` : `${css.button} ${css.dnone}`}
      >
        Get Into It <ArrowRightCircle size={25}/>
      </button>
    </div>
  );
};

export default WelcomePage;
