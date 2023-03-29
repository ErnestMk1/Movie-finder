import './Movies.css';
import { MovieData } from './Movies';
import { NavLink } from 'react-router-dom';

type MovieListProps = {
  movies: Array<MovieData>;
  favoritesComponent: any;
  favoritesHandler: (movie: MovieData) => void;
};

const MovieList = ({ movies, favoritesComponent, favoritesHandler }: MovieListProps) => {
  const FavoriteComponent = favoritesComponent;

  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className='movie_card'>
          <NavLink className="top_overlay" to={`/movies/${movie.imdbID}`}>Show More</NavLink>
          <img src={movie.Poster} alt="movie Poster" />
          <h2>{movie.Title}</h2>

          <div className="overlay" onClick={() => favoritesHandler(movie)}><FavoriteComponent /></div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
