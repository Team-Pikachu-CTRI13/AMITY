import './Login.css';
// import logo from '../../assets/amity logo - dark.png';
import logo from '../../../../public/logo.png';
import React from 'react';

const Login = () => {
  return (
    <div className='login'>
      <div className='logo'>
        amity
        <img className='icon' src={logo} />
      </div>
      <button className='loginBtn' onClick={() => window.location.href = 'http://localhost:8080/auth/google'}>
        continue with Google
      </button>
    </div>
  );
};

export default Login;