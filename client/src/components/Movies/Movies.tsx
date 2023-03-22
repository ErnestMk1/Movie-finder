import css from './Movies.module.css';
import {
  useRef,
  useState
} from 'react';

const Movies = () => {
  const [inputText, setInputText] = useState('');
  const [oldChecker, setOldChecker] = useState(false);
  const [newChecker, setNewChecker] = useState(false);
  const inputEl = useRef<HTMLInputElement | any>();

  const onInputChange = (e: any) => {
    e.preventDefault();
    setInputText(inputEl.current.value);
  };

  const onOldChange = () => {
    if (oldChecker) {
      setOldChecker(false);
    } else {
      setOldChecker(true);
      setNewChecker(false);
    }
  };
  const onNewChange = () => {
    if (newChecker) {
      setNewChecker(false);
    } else {
      setNewChecker(true);
      setOldChecker(false);
    }
  };

  return (
    <div className={css.main_div}>
      <div className={css.searching}>
        <input
          type="text"
          placeholder="You're looking for..."
          className={css.searching_input}
          onChange={onInputChange}
          value={inputText}
          ref={inputEl}
        />

        <div className={css.checkboxes}>
          <label htmlFor="old-fashioned">
            <input
              type="checkbox"
              id="old-fashioned"
              checked={oldChecker}
              onChange={onOldChange}
            />
            OLD-FASHIONED
          </label>


          <label htmlFor="new">
            <input
              type="checkbox"
              id="new"
              checked={newChecker}
              onChange={onNewChange}
            />
            NEW
          </label>
        </div>
      </div>
    </div>
  );
};

export default Movies;

// API with the key: http://www.omdbapi.com/?i=tt3896198&apikey=9c56c4d4
