import "./MovieCard.css";
import "animate.css";
import { useNavigate, useParams } from 'react-router-dom';
import {
  useContext,
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import {
  APIendpoint,
  APIkey,
  MovieData
} from '../Movies/Movies';
import arrow from '../../imgs/arrow.svg';
import MovieList from "../Movies/MovieList";
import AddFavorites from "../Movies/AddFavorites";
import { FavoritesContext, AlertContext } from "../../App";
import { saveToLocalStorage, containsObject } from "../Movies/Movies";
import AlertComponent from "../Alert/AlertComponent";

const initialState: MovieData = {
  Title: "No such movie :(",
  Year: "2017",
  Rated: "PG-13",
  Released: "",
  Runtime: "",
  Genre: "",
  Director: "James Gunn",
  Writer: "James Gunn, Dan Abnett, Andy Lanning",
  Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
  Plot: "",
  Language: "English",
  Country: "United States",
  Awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total",
  Poster: "",
  Ratings:[
    { Source: "Internet Movie Database", Value: "7.6/10" },
    { Source: "Rotten Tomatoes", Value: "85%" },
    { Source: "Metacritic", Value: "67/100" }
  ],
  Metascore: "67",
  imdbRating: "",
  imdbVotes: "695,656",
  imdbID: "tt3896198",
  Type: "movie",
  DVD: "22 Aug 2017",
  BoxOffice: "$",
  Production: "N/A",
  Website: "N/A",
  Response: "True"
};

interface MovieCardProps {
  setFavorites: (value: MovieData[]) => void;
  setShowAlert: (value: boolean) => void;
}

const MovieCard = ({ setFavorites, setShowAlert }: MovieCardProps) => {
  const favorites = useContext(FavoritesContext);
  const showAlert = useContext(AlertContext);
  const [movie, setMovie] = useState<MovieData>(initialState);
  const [recomendations, setRecomendations] = useState<Array<MovieData>>([initialState]);
  const { movieID } = useParams();
  const navigate = useNavigate();

  const addToFavorites = (movie: MovieData) => {
    const newFavorites = [...favorites];
    if (containsObject(movie, newFavorites)) {
      setShowAlert(true);
    } else {
      newFavorites.push(movie);
    }
    setFavorites(newFavorites);
    saveToLocalStorage(newFavorites);
  };

  const getRecomendations = (someMovie: MovieData) => {
    const searchingByGenre = someMovie.Genre.split(',')[0].toLowerCase();

    axios.get(APIendpoint, {
      params: {
        apikey: APIkey,
        s: searchingByGenre,
        type: "movie"
      }
    })
    .then(resp => setRecomendations(resp.data.Search))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get(APIendpoint, {
        params: {
          apikey: APIkey,
          i: movieID,
          type: "movie"
        }
      })
      .then(response => {
        setMovie(response.data);
        getRecomendations(response.data);
      })
      .catch(err => console.error(err))
  }, [movieID]);

  const handleBtnClick = () => {
    navigate("/movies");
  };

  return (
    <div className="movie-card_main-div">
      <button
        onClick={handleBtnClick}
        className="navigation-button"
      >
        <img src={arrow} alt="go back arrow" />
        Go Back
      </button>

      <div className="animate__animated animate__fadeIn movie-card">
        <div className="movie-caption_block">
          <h1>{movie.Title}</h1>
        </div>

        <section className="movie-card_poster">
          <img src={movie.Poster} alt="Movie Poster" />
        </section>

        <section className="movie-card_content">
          <p className="movie-plot"><b>Plot:</b> {movie.Plot}</p>
          <p className="movie-genre"><b>Genre:</b> {movie.Genre}</p>
          <p className="movie-rating"><b>Rating IMDB:</b> {movie.imdbRating}</p>
          <p className="movie-release"><b>Date of Release:</b> {movie.Released}</p>
          <p className="movie-duration"><b>Duration:</b> {movie.Runtime}</p>
          <p className="movie-boxOffice"><b>Box Office Fees:</b> {movie.BoxOffice}</p>
          <p className="movie-country"><b>Country:</b> {movie.Country}</p>
        </section>
      </div>

      <div className="alert-block">
        <AlertComponent showAlert={showAlert} setShowAlert={setShowAlert} />
      </div>

      <div className="movie-recomendations_block">
        <h1>You might also like</h1>
        <div className="movieList-container">
          <MovieList
            movies={recomendations}
            favoritesComponent={AddFavorites}
            favoritesHandler={addToFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
