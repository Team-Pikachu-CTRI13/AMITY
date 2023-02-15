import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionSetField } from '../../Redux/slices/userSlice';

import Movie from '../Movie/Movie.jsx';
import Login from '../Login/Login.jsx';

import logo from '../../assets/amity logo - dark.png';


const Home = () => {
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:8080/auth/user',
    }).then((res) => {
      if (res.data) {
        // console.log('!', res.data);
        dispatch(actionSetField({ field: 'email', value: res.data.email }));
        dispatch(actionSetField({ field: 'hasPartner', value: res.data.has_partner }));
        dispatch(actionSetField({ field: 'id', value: res.data.id }));
        dispatch(actionSetField({ field: 'page', value: res.data.page }));
        dispatch(actionSetField({ field: 'picture', value: res.data.picture }));
        dispatch(actionSetField({ field: 'sub', value: res.data.sub }));
      }
    });
  }, []);

  return (
    <>
      {/* <div>This is home</div> */}
      {email ? (<Movie/>) : (<Login/>)}
    </>
  );
};

export default Home;
