import css from './WelcomePage.module.css';

const WelcomePage = () => {
  const onGetClick = () => {};

  return (
    <header className={css.main_div}>
      <h2>Run out of movies to watch?</h2>
      <h1>You're in the right place!</h1>

      <button onClick={onGetClick}>Get Recommendations</button>
    </header>
  );
};

export default WelcomePage;
