import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';
import { BsHeartFill, BsXLg } from 'react-icons/bs';

import logo from '../../assets/amity logo - dark.png';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
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

  //handleLike
  const handleLike = e => {
    // console.log('handle like fired');
    // console.log('do we have access to the current movie? ', movies[index]); => yes, we do

    //we need access to the user info in the state
    

    
  }

  const handleDislike = e => {
    // console.log('handle dislike fired');
    //if user click the dislike button, nothing will happen at the backend
    //we will just direct the user to the next move by invoking nextMovie
    nextMovie();
  }

  const nextMovie = () => {
    setModalOpen(false);
    setIndex((index + 1) % 20);
  }

  const prevMovie = () => {
    setModalOpen(false);
    setIndex((index + 19) % 20);
  }

  return (
    <div className='movie'>
      <div className='logo'>
        amity
        <img className='icon' src={logo} />
      </div>
      {movies.length > 0 && (
        <>
          <div className='wrapper'>
            <div className="button-container">
              <button onClick={() => setModalOpen(!modalOpen)} className='info'>i</button>
              {modalOpen && <div className='modal'>{movies[index].overview}</div>}
              <button onClick={prevMovie} className="prev-slide">&#10094;</button>
              <button onClick={nextMovie} className="next-slide">&#10095;</button>
            </div>
            <img className='poster' src={`https://image.tmdb.org/t/p/w1280/${movies[index].poster_path}`} />
          </div>
          <div className='likeButtons'>
            <button className='like' onClick={handleLike}>
              <BsHeartFill className='testing' style={{ color: 'Green', }}/>
            </button>
            <button className='dislike' onClick={handleDislike}>
              <BsXLg />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Movie;