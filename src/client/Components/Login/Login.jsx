import './Login.css';
// import '../../../../components/login.module.css';
import logo from '../../../../public/logo.png';
import React from 'react';

const Login = () => {
  return (
    <div className='login'>


      <ul>
        <p>*this app allows the user to swipe on their film preferences and connect with friends
        </p>
        {/* <p>current features:</p> */}
        {/* <li></li> */}
      </ul>

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