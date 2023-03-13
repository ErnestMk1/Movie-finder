import css from './App.module.css';
import Age from './components/Age/Age';
import WelcomePage from './components/Welcome/WelcomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className={css.main_div}>
      <Router>
        <Routes>
          <Route path="/age" element={ <Age /> } />
          <Route path="/" element={ <WelcomePage /> } />
          <Route path='/*' element={ <WelcomePage /> } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
