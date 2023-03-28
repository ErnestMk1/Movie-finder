import './Movies.css';
import { MovieData } from './Movies';
import { useNavigate, generatePath } from 'react-router-dom';

type MovieListProps = {
  movies: Array<MovieData>;
  favoritesComponent: any;
  favoritesHandler: (movie: MovieData) => void;
};

const MovieList = ({ movies, favoritesComponent, favoritesHandler }: MovieListProps) => {
  const FavoriteComponent = favoritesComponent;
  const navigate = useNavigate();

  const onBtnClick = (movieID: string) => {
    navigate(generatePath(`/movies/${movieID}`));
  };

  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className={'movie_card'}>
          <div className="top_overlay" onClick={() => onBtnClick(movie.imdbID)}>Show More</div>
          <img src={movie.Poster} alt="movie Poster" />
          <h2>{movie.Title}</h2>

          <div className="overlay" onClick={() => favoritesHandler(movie)}><FavoriteComponent /></div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
