import './App.css';
import WelcomePage from './components/Welcome/WelcomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Movies from './components/Movies/Movies';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="App">
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
