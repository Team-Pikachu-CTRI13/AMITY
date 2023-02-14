import './Login.css';
import React from 'react';

const Login = () => {
  return (
    <div className='login'>
      <button onClick={() => window.location.href = 'http://localhost:8080/auth/google'}>
        Continue with Google
      </button>
    </div>
  );
};

export default Login;