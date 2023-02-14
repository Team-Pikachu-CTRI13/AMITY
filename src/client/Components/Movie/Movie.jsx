import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
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
      {/* index: {index} */}
      {/* {movies.length > 0 && <div>{movies[index].title}</div>} */}
      {movies.length > 0 && <img className='poster' src={`https://image.tmdb.org/t/p/w1280/${movies[index].poster_path}`}/>}
      {/* {movies} */}
      <button onClick={() => setIndex((index + 1) % 20)}>next</button>
      <button onClick={() => setIndex((index + 19) % 20)}>back</button>
    </div>
  )
}

export default Movie;