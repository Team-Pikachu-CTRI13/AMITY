import './Login.css';
// import styles from '../../../../components/login.module.css';
// const { login, logo, icon, loginBtn } = styles;
import logoPic from '../../../../public/logo.png';
import React from 'react';

const Login = () => {
  return (
    <div className='login'>
      {/* *this app allows the user to swipe on their film preferences and connect with friends */}

      <div className='logo'>
        amity
        <img className='icon' src={logoPic} />
      </div>

      <button className='loginBtn' onClick={() => window.location.href = 'http://localhost:8080/auth/google'}>
        continue with Google
      </button>
    </div>
  );
};

export default Login;