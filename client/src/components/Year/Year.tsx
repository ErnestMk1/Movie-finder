import css from './Year.module.css';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Year = () => {
  const [showCaption, setShowCaption] = useState(false);
  const [showBtns, setShowBtns] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCaption(true), 500);
    setTimeout(() => setShowBtns(true), 1500);
  }, [])

  return (
    <div className={css.main_div}>
      <h1 className={showCaption ? `${css.main_divCaption} animate__animated animate__fadeInDownBig` : `${css.main_divCaption} ${css.dnone}`}>Which movies do you prefer more?</h1>
      <div className={showBtns ? `${css.button_block} animate__animated animate__fadeIn` : `${css.button_block} ${css.vsblh}`}>
        <button className={css.button}>
          <NavLink to="/year/old">
            Old fashioned ones<br></br>(1990-2010) <ArrowRightCircle size={25}/>
          </NavLink>
        </button>
        <button className={css.button}>
          <NavLink to="/year/new">
            Newer (2010-2023) <ArrowRightCircle size={25}/>
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Year;
