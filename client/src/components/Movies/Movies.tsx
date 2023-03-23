import css from './Movies.module.css';
import {
  useRef,
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import MovieList from './MovieList';

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

const Movies = () => {
  const [inputText, setInputText] = useState('');
  const [oldChecker, setOldChecker] = useState(false);
  const [newChecker, setNewChecker] = useState(false);
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Array<MovieData>>([]);
  const inputEl = useRef<HTMLInputElement | any>();

  const APIkey = '9c56c4d4';
  const APIendpoint = 'http://www.omdbapi.com/';

  const getMovieData = async (title: string): Promise<MovieData> => {
    const response = await axios.get(APIendpoint, {
      params: {
        apikey: APIkey,
        t: title,
      },
    });

    return response.data;
  };

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

  const getMoviesRequest = async (input: string) => {
    const url = `http://www.omdbapi.com/?s=${input}&apikey=9c56c4d4`;

    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
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
    getTopRatedMovies()
      .then((movies: any) => {
        console.log(movies);
        return setTopRatedMovies(movies);
      })
      .catch((err: Error) => console.error(err));
  }, []);

  useEffect(() => {
    getMoviesRequest(inputText);
  }, [inputText]);

  return (
    <div className={css.main_div}>
      <div className={css.searching}>
        <input
          type="text"
          placeholder="You're looking for..."
          className={css.searching_input}
          onChange={onInputChange}
          value={inputText}
          ref={inputEl}
        />

        <div className={css.checkboxes}>
          <label htmlFor="old-fashioned">
            <input
              type="checkbox"
              id="old-fashioned"
              checked={oldChecker}
              onChange={() => onCheckChange(setOldChecker, setNewChecker, 'old')}
            />
            OLD-FASHIONED
          </label>


          <label htmlFor="new">
            <input
              type="checkbox"
              id="new"
              checked={newChecker}
              onChange={() => onCheckChange(setNewChecker, setOldChecker, 'new')}
            />
            NEW
          </label>
        </div>
      </div>

      <MovieList movies={topRatedMovies} />
      <MovieList movies={movies} />
    </div>
  );
};

export default Movies;
