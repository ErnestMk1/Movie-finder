import css from './Keyword.module.css';
import {
  useState,
  useEffect,
  useRef
} from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const Keyword = () => {
  const input = useRef<HTMLInputElement | any>();
  const [showCaption, setShowCaption] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTimeout(() => setShowCaption(true), 500);
    setTimeout(() => setShowInput(true), 1000);
  });

  const onInputChange = (e: any) => {
    e.preventDefault();
    setInputValue(input.current.value);
  };

  return (
    <div className={css.main_div}>
      <h1 className={showCaption ? `${css.caption} animate__animated animate__fadeIn` : `${css.caption} ${css.vsblh}`}>
        Enter a Keyword:
      </h1>

      <input
        className={showInput ? `${css.keyword_input} animate__animated animate__fadeIn` : `${css.keyword_input} ${css.vsblh}`}
        type="text"
        value={inputValue}
        onChange={onInputChange}
        ref={input}
      />

      <button className={css.button}>Next Step <ArrowRightCircle size={25}/></button>
    </div>
  );
};

export default Keyword;
