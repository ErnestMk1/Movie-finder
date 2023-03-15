import css from './Movies.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  let releaseDMin = '';
  let releaseDMax = '';

  if (id === 'new') {
    releaseDMin = '2010-01-01';
    releaseDMax = '';
  } else if (id === 'old') {
    releaseDMin = '1990-01-01';
    releaseDMax = '2010-12-31';
  }

  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/v2/find',
    params: {
      title: 'a',
      titleType: 'movie,tvMovie',
      limit: '30',
      sortArg: 'moviemeter,asc',
      releaseDateMin: releaseDMin,
      releaseDateMax: releaseDMax
    },
    headers: {
      'X-RapidAPI-Key': '3750bcc244mshe235e9242169807p11f2e6jsn9dc1bda2bdd7',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  useEffect(() => {
    axios.request(options).then(response => {
      setMovies(response.data)
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  });

  return (
    <div className={css.main_div}>
      <h1>Hello there!</h1>
      <p>Here's some list of movies</p>
      {/* {movies.map(movie => movie)} */}
    </div>
  );
};

export default Movies;
