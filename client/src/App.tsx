import css from './App.module.css';
import Year from './components/Year/Year';
import WelcomePage from './components/Welcome/WelcomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Keyword from './components/Keyword/Keyword';

const App = () => {
  return (
    <div className={css.main_div}>
      <Router>
        <Routes>
          <Route path="/keyword" element={ <Keyword /> } />
          <Route path="/year/old" element={ <Movies /> } />
          <Route path="/year/new" element={ <Movies /> } />
          <Route path="/year/*" element={ <Year /> } />
          <Route path="/" element={ <WelcomePage /> } />
          <Route path='/*' element={ <WelcomePage /> } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
