import './Movies.css';
import "animate.css";
import {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { Dropdown } from 'react-bootstrap';
import TrackVisibility from "react-on-screen";
import axios from 'axios';
import MovieList from './MovieList';
import AddFavorites from './AddFavorites';
import RemoveFavorites from './RemoveFavorites';
import Footer from '../Footer/Footer';
import { FavoritesContext, AlertContext, SuccessPushContext } from '../../App';
import AlertComponent from '../Alert/AlertComponent';

export interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

interface MoviesProps {
  setFavorites: (value: MovieData[]) => void;
  setShowAlert: (value: boolean) => void;
  setSuccessPush: (value: boolean) => void;
};

export const saveToLocalStorage = (items: any) => {
  localStorage.setItem('movie-app-favorites', JSON.stringify(items));
};

export const containsObject = (obj: MovieData, array: Array<any>): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].imdbID === obj.imdbID) {
      return true;
    }
  }

  return false;
};

export const APIkey = 'bbf0084';
export const APIendpoint = 'https://www.omdbapi.com/';

const Movies = ({ setFavorites, setShowAlert, setSuccessPush }: MoviesProps) => {
  const successPush = useContext(SuccessPushContext);
  const favorites = useContext(FavoritesContext);
  const showAlert = useContext(AlertContext);
  const [inputText, setInputText] = useState('');
  const [oldChecker, setOldChecker] = useState(false);
  const [newChecker, setNewChecker] = useState(false);
  const [movies, setMovies] = useState<Array<MovieData>>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Array<MovieData>>([]);
  const [show, setShow] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const inputEl = useRef<HTMLInputElement | any>();

  const getMovieData = async (title: string): Promise<MovieData> => {
    const response = await axios.get(APIendpoint, {
      params: {
        apikey: APIkey,
        t: title,
      },
    });

    return response.data;
  };

  const onInputChange = (e: any) => {
    e.preventDefault();
    setInputText(inputEl.current.value);
  };

  const onCheckChange = (a: Function, b: Function, c: 'old' | 'new') => {
    if (c === 'old' ? oldChecker : newChecker) {
      a(false);
    } else {
      a(true);
      b(false);
    }
  };

  useEffect(() => {
    const getTopRatedMovies = async (): Promise<MovieData[]> => {
      const topRatedMovieTitles = [
        'The Shawshank Redemption',
        'The Godfather',
        'The Godfather: Part II',
        'The Dark Knight',
        '12 Angry Men',
        'Schindler\'s List',
        'The Lord of the Rings: The Return of the King',
        'Pulp Fiction',
        'The Lord of the Rings: The Fellowship of the Ring',
        'Forrest Gump'
      ];

      const movieDataPromise = topRatedMovieTitles.map(getMovieData);
      const movieData = await Promise.all(movieDataPromise);

      const sortedMovieData = movieData.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
      const topTenMovies = sortedMovieData.slice(0, 10);

      return Promise.resolve(topTenMovies);
    };

    getTopRatedMovies()
      .then((movies: any) => {
        return setTopRatedMovies(movies);
      })
      .catch((err: Error) => console.error(err));
  }, [setTopRatedMovies]);

  useEffect(() => {
    const getMoviesRequest = async (input: string) => {
      const response = await axios.get(APIendpoint, {
        params: {
          apikey: APIkey,
          s: input,
          type: "movie"
        }
      });

      if (response.data.Search) {
        const resp = response.data.Search;
        if (oldChecker) {
          setMovies(resp.filter((mov: any) => Number(mov.Year) <= 2010));
        } else if (newChecker) {
          setMovies(resp.filter((mov: any) => Number(mov.Year) >= 2010 && Number(mov.Year) <= 2023));
        } else {
          setMovies(resp);
        }
      }
    };

    getMoviesRequest(inputText);
  }, [inputText, oldChecker, newChecker]);

  useEffect(() => {
    const moviesFavorites: MovieData[] = JSON.parse(localStorage.getItem('movie-app-favorites') || '[]');

    setFavorites(moviesFavorites);
  }, [setFavorites]);

  const addToFavorites = (movie: MovieData) => {
    const newFavorites = [...favorites];

    if (containsObject(movie, newFavorites)) {
      setSuccessPush(false);
      setShowAlert(true);
    } else {
      newFavorites.push(movie);
      setSuccessPush(true);
      setShowAlert(true);
    }

    setFavorites(newFavorites);
    saveToLocalStorage(newFavorites);
  };
  const removeFromFavorites = (movie: MovieData) => {
    const newFavorites = favorites.filter((mov) => mov.imdbID !== movie.imdbID);
    setFavorites(newFavorites);
    saveToLocalStorage(newFavorites);
  };

  const onDropdownClick = () => {
    setShow(!show);
  };

  const onFirstFavoritesClick = () => {
    setFirstClick(true);
  };

  return (
    <div className="main_div">
      <TrackVisibility>
        {({ isVisible }) =>
          <div className={isVisible ? "animate__animated animate__pulse searching" : "searching"}>
            <h1>Movie Finder</h1>
            <input
              type="text"
              placeholder="You're looking for..."
              className="searching_input"
              onChange={onInputChange}
              value={inputText}
              ref={inputEl}
            />

            <Dropdown
              role="menuitemcheckbox"
              id="dropdown-menu"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              onClick={onDropdownClick}
            >
              <span>Specify a Year</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-down-circle"
                viewBox="0 0 16 16"
              >
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
              </svg>
              <Dropdown.Menu show={show} id="dropdown-menu_content">
              <label htmlFor="old-fashioned" className='label'>
                  <input
                    type="checkbox"
                    id="old-fashioned"
                    checked={oldChecker}
                    onChange={() => onCheckChange(setOldChecker, setNewChecker, 'old')}
                    className="input-checker"
                  />
                  OLD-FASHIONED <b>(1980-2010)</b>
                </label>

                <label htmlFor="new" className='label'>
                  <input
                    type="checkbox"
                    id="new"
                    checked={newChecker}
                    onChange={() => onCheckChange(setNewChecker, setOldChecker, 'new')}
                  />
                  NEW <b>(2010-2023)</b>
                </label>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        }
      </TrackVisibility>

      <div className="alert-block">
        <AlertComponent
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertMsg={successPush ? "Added!)" : "You've already have this movie!"}
        />
      </div>

      <div className="movies-block">
        <div className="search-result">
          <div className="movieList-container">
            <MovieList
              movies={movies}
              favoritesComponent={() => <AddFavorites firstClick={firstClick} onFirstFavoritesClick={onFirstFavoritesClick} />}
              favoritesHandler={addToFavorites}
            />
          </div>
        </div>

        <div className="greatest-movies">
          <h1>Top Rated Movies</h1>
          <div className="movieList-container">
            <MovieList
              movies={topRatedMovies}
              favoritesComponent={() => <AddFavorites firstClick={firstClick} onFirstFavoritesClick={onFirstFavoritesClick} />}
              favoritesHandler={addToFavorites}
            />
          </div>
        </div>

        <TrackVisibility>
          {({ isVisible }) =>
            <div className="favorites-movies">
              <h1 className={isVisible ? "animate__animated animate__pulse" : ""}>{favorites.length > 0 ? 'Favorites' : ''}</h1>
              <div className="movieList-container" id="favorites">
                <MovieList
                  movies={favorites}
                  favoritesComponent={RemoveFavorites}
                  favoritesHandler={removeFromFavorites}
                />
              </div>
            </div>
          }
        </TrackVisibility>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
