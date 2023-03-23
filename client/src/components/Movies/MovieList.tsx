import css from './Movies.module.css';
import { MovieData } from './Movies';

type MovieListProps = {
  movies: Array<MovieData>;
};

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className={css.movieList_div}>
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <img src={movie.Poster} alt="movie Poster" />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
