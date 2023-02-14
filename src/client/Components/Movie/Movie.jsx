import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const response = axios({
      method: 'post',
      withCredentials: true,
      url: 'http://localhost:8080/api/getMovies'
    }).then(({ data }) => {
      console.table(data);
      setMovies(data);
    })
  }, []);
  console.log(movies);
  return (
    <div className='movie'>
      {movies.map((movie) => <div>{movie.title}</div>)}
      {/* {movies} */}
    </div>
  )
}

export default Movie;