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
import React, { useState } from 'react';

export const FavoritesContext = React.createContext<Array<MovieData>>([]);
export const AlertContext = React.createContext(false);

const App = () => {
  const [favorites, setFavorites] = useState<Array<MovieData>>([]);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="App">
      <FavoritesContext.Provider value={favorites}>
        <AlertContext.Provider value={showAlert}>
          <Router>
            <Routes>
              <Route path="/movies/:movieID" element={ <MovieCard setShowAlert={setShowAlert} setFavorites={setFavorites} /> } />
              <Route path="/movies" element={ <Movies setShowAlert={setShowAlert} setFavorites={setFavorites} /> } />
              <Route path="/" element={ <WelcomePage /> } />
              <Route path="/*" element={ <WelcomePage /> } />
            </Routes>
          </Router>
        </AlertContext.Provider>
      </FavoritesContext.Provider>
    </div>
  );
};

export default App;
