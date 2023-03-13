import css from './Age.module.css';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';

const Age = () => {
  const [showCaption, setShowCaption] = useState(false);
  const [showBtns, setShowBtns] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCaption(true), 500);
    setTimeout(() => setShowBtns(true), 1500);
  }, [])

  return (
    <div className={css.main_div}>
      <h1 className={showCaption ? `${css.main_divCaption} animate__animated animate__fadeInDownBig` : `${css.main_divCaption} ${css.dnone}`}>Ur Age?</h1>
      <div className={showBtns ? `${css.button_block} animate__animated animate__fadeIn` : `${css.button_block} ${css.vsblh}`}>
        <button className={css.button}>0 - 17 <ArrowRightCircle size={25}/></button>
        <button className={css.button}>18 - 30 <ArrowRightCircle size={25}/></button>
        <button className={css.button}>30 - 135 <ArrowRightCircle size={25}/></button>
      </div>
    </div>
  );
};

export default Age;
