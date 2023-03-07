import css from './App.module.css';
import WelcomePage from './components/Welcome/WelcomePage';

const App = () => {
  return (
    <div className={css.main_div}>
      <WelcomePage />
    </div>
  );
};

export default App;
