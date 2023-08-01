import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';
import { BsHeartFill, BsXLg } from 'react-icons/bs';

import logo from '../../assets/amity logo - dark.png';
import { useSelector, useDispatch } from 'react-redux';
import { actionSetField } from '../../Redux/slices/userSlice';

const Movie = (props) => {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [seenMovies, setSeenMovies] = useState(new Set([0]));

  useEffect(() => {
    getNewMovies()
  }, []);
  console.log(movies);

  const getNewMovies = () => {
    console.log('GETTING NEW MOVIES');
    const response = axios({
      method: 'post',
      withCredentials: true,
      url: 'http://localhost:8080/api/getMovies'
    }).then(({ data }) => {
      console.table(data);
      setMovies(data);
    });
  };

  //The code block below is getting access to the state about the loggedin user
  const currUser = useSelector((state) => state.user);
  // console.log('currUser in movies component', currUser); => we have access to the currUser info as an object

  //handleLike
  const handleLike = e => {
    // console.log('handle like fired');
    // console.log('do we have access to the current movie? ', movies[index]); => yes, we do

    //we need access to the user info in the state
    const id = currUser.id;
    const movieId = movies[index].movieId;

    console.log('when user click like', id, movieId);

    axios.post('http://localhost:8080/api/likedMovies', {
      id,
      movieId
    })
      .then(res => {console.log('anything in res.data',res.data)})
      .catch(err => {console.log(err)})
  }

  const handleDislike = e => {
    // console.log('handle dislike fired');
    //if user click the dislike button, nothing will happen at the backend
    //we will just direct the user to the next move by invoking nextMovie
    console.log('HANDLE CLICK TARGET: ', e.target)
    nextMovie();
  }

  const hasPartner = useSelector((state) => state.user.hasPartner);
  const useInput = (init) => {
    const [ value, setValue ] = useState(init);
    const onChange = (e) => { setValue(e.target.value); };
    return [ value, onChange ];
  };
  const [ partnerEmail, partnerOnChange ] = useInput('');
  const dispatch = useDispatch();
  const submitPartner = async () => {
    // alert('in submitPartner');
    const response = await axios({
      method: 'POST',
      withCredentials: true,
      url: 'http://localhost:8080/api/connect',
    }).then((res) => {
      alert('!', res.data);
      console.log('!L72 submitPartner outside:', res.data);
      if (res.data) {
        console.log('!L72 submitPartner:', res.data);
        dispatch(actionSetField({ field: 'partnerInfo', value: res.data.email }));
      }
    });
  };

  const nextMovie = () => {
    setModalOpen(false);
    const newIndex = (index + 1) % 20;
    setSeenMovies(new Set([...seenMovies, newIndex]));
    setIndex(newIndex);
    if (seenMovies.size >= 20) getNewMovies();
   };

  const prevMovie = () => {
    setModalOpen(false);
    const newIndex = (index + 19) % 20;
    setSeenMovies(new Set([...seenMovies, newIndex]));
    setIndex(newIndex);
    if (seenMovies.size >= 20) getNewMovies();
  };

  return (
    <div className='movie'>
      <div className='logoSmall'>
        amity
        <img className='iconSmall' src={logo} />
        <button>Logout</button>
      </div>

      {hasPartner || (<>PLEASE
        <form>
          <input name="getPartner" type="text" placeholder="your partner's email" value={partnerEmail} onChange={partnerOnChange} />
          {/* <Link to="/page"> */}
            <button type='submit' onClick={submitPartner}>CONNECT!</button>
          {/* </Link> */}
        </form>
      </>)}

      {movies.length > 0 && (
        <>
          <div className='wrapper'>
            <div className="button-container">
              <button onClick={() => setModalOpen(!modalOpen)} className='info'>i</button>
              {modalOpen && <div className='modal'>{movies[index].overview}</div>}
              <button onClick={prevMovie} className="prev-slide">&#10094;</button>
              <button onClick={nextMovie} className="next-slide">&#10095;</button>
            </div>

            {/* <button onClick={() => setModalOpen(!modalOpen)} className='info'>
              <img className='poster' src={`https://image.tmdb.org/t/p/w1280/${movies[index].poster_path}`}/>
            </button>
            {modalOpen && <div className='modal'>{movies[index].overview}</div>} */}

            <img className='poster' src={`https://image.tmdb.org/t/p/w1280/${movies[index].poster_path}`}/>
          </div>
          <div className='likeButtons'>
            <button className='like' onClick={handleLike}>
              <BsHeartFill className='testing' />
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