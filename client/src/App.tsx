import css from './App.module.css';
import WelcomePage from './components/Welcome/WelcomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies/Movies';

const App = () => {
  return (
    <div className={css.main_div}>
      <Router>
        <Routes>
          <Route path="/movies" element={ <Movies /> } />
          <Route path="/" element={ <WelcomePage /> } />
          <Route path='/*' element={ <WelcomePage /> } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
