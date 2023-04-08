import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionSetField } from '../../Redux/slices/userSlice';

import Movie from '../Movie/Movie.jsx';
import Login from '../Login/Login.jsx';
import Navbar from '../Navbar/Navbar';

// import logo from '../../assets/amity logo - dark.png';
// import logo from '../../../../public/logo.png';

const Home = () => {
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:8080/auth/user',
    }).then(({data}) => {
      if (data) {
         const response = axios({
          method: 'get',
          withCredentials: true,
          url: `http://localhost:8080/auth/test/${data.sub}`,
        }).then(({data}) => {
          // console.log('?', data);
          if (data) {
            // console.log('!', data);
            dispatch(actionSetField({ field: 'email', value: data.email }));
            dispatch(actionSetField({ field: 'hasPartner', value: data.has_partner }));
            dispatch(actionSetField({ field: 'id', value: data.id }));
            dispatch(actionSetField({ field: 'page', value: data.page }));
            dispatch(actionSetField({ field: 'picture', value: data.picture }));
            dispatch(actionSetField({ field: 'sub', value: data.sub }));
          } else { console.log('error in home.js'); }
        });
      } else { console.log('error in home.js'); }
    });
  }, []);


  return (
    <>
      {email && <Navbar />}
      {email ? <Movie /> : <Login />}
    </>
  );
};

export default Home;
