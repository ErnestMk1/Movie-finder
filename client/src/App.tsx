import './App.css';
import WelcomePage from './components/Welcome/WelcomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Movies from './components/Movies/Movies';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCard from './components/MovieCard/MovieCard';
import { MovieData } from './components/Movies/Movies';
import React, { useState, useEffect } from 'react';

export const FavoritesContext = React.createContext<Array<MovieData>>([]);
export const AlertContext = React.createContext(false);
export const SuccessPushContext = React.createContext(false);

const App = () => {
  const [favorites, setFavorites] = useState<Array<MovieData>>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [successPush, setSuccessPush] = useState(false);

  useEffect(() => {
    const time = successPush ? 2000 : 5000;
    setTimeout(() => setShowAlert(false), time);
  }, [showAlert, successPush])

  return (
    <div className="App">
      <FavoritesContext.Provider value={favorites}>
        <AlertContext.Provider value={showAlert}>
          <SuccessPushContext.Provider value={successPush}>
            <Router>
              <Routes>
                <Route path="/movies/:movieID" element={ <MovieCard setSuccessPush={setSuccessPush} setShowAlert={setShowAlert} setFavorites={setFavorites} /> } />
                <Route path="/movies" element={ <Movies setSuccessPush={setSuccessPush} setShowAlert={setShowAlert} setFavorites={setFavorites} /> } />
                <Route path="/" element={ <WelcomePage /> } />
                <Route path="/*" element={ <WelcomePage /> } />
              </Routes>
            </Router>
          </SuccessPushContext.Provider>
        </AlertContext.Provider>
      </FavoritesContext.Provider>
    </div>
  );
};

export default App;
