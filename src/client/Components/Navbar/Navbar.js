import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { actionSetField } from '../../Redux/slices/userSlice';
import { v4 as uuid } from 'uuid';

const Navbar = ({ leftItems }) => {
  // This is how you interact with Redux store with hooks
  // syntax:
  // 'user' is the name of the slice (see userSlice.js)
  // 'email' is a field in the slice
  const email = useSelector((state) => state.user.email);
  const items = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // On first render, get user data
  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:8080/auth/user',
    }).then((res) => {
      // console.log(res);
      if (res.data) {
        // console.log(res.data);
        // Output of console.log(res.data);
        //    { "_id": 1,
        //      "sub": "117477940901052965444",
        //      "picture": "https://lh3.googleusercontent.com/a/default-user=s96-c",
        //      "email": "michael.chiang.mc5@gmail.com",
        //      "email_verified": true}
        dispatch(actionSetField({ field: 'email', value: res.data.email }));
        dispatch(actionSetField({ field: 'id', value: res.data.id }));
      }
    });
  }, []);
  return (
    <div className={styles.navbar}>
      <div className={styles.row}>
        <div className={styles.row}>
          {/* {console.log('ITEMS: ', items)} */}
          {
            <a className={styles.homeBtn} href='/'>Home</a>
          }
        </div>

        <div className={styles.row}>
          <div className={styles.margin}>
            {email ? (
              <>
                <a
                  className={styles.logoutBtn}
                  href='http://localhost:8080/auth/logout'
                >
                  Logout
                </a>
                <img className={styles.profileImg} src={items.picture} />
              </>
            ) : (
              <a href={`http://localhost:8080/auth/google`}>log in</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
