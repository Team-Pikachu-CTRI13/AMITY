import styles from './login.module.css';
import Image from 'next/image';
import heartLogo from '../public/logo.png'
// import Logo from '../public/LOGO-FINAL.svg';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


const Login = () => {
  return (
    <div className='login'>
      <div className='logo'>
        amity
        {/* <img className='icon' src={logo} /> */}
        <Image
          // className="icon"
          src={heartLogo}
          alt="Amity logo"
          height={16}
        />
      </div>

      <form action="http://localhost:3000/api/auth/signin/google" method="POST">
        <input type="hidden" name="csrfToken" value="90aabf49d87a705b5c66edf048d693dfcfca1babd80c7fe0bfa18149bbcc1081" />
        <input type="hidden" name="callbackUrl" value="http://localhost:3000/" />
        <button type="submit" class="button"
          // style="--provider-bg: #fff; --provider-dark-bg: #fff; --provider-color: #000; --provider-dark-color: #000;"
          >
          <Image
            loading="lazy"
            height="24"
            width="24"
            id="provider-logo"
            src="https://authjs.dev/img/providers/google.svg"
          />
          {/* <Image
            loading="lazy"
            height="24"
            width="24"
            id="provider-logo-dark"
            src="https://authjs.dev/img/providers/google.svg"
          /> */}
          {/* <img loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg">
          <img loading="lazy" height="24" width="24" id="provider-logo-dark" src="https://authjs.dev/img/providers/google.svg"> */}
          <span>Sign in with Google</span>
        </button>
      </form>

      <button className='loginBtn'
        // onClick={() => window.location.href = 'http://localhost:8080/auth/google'}
        onClick={() => signIn()}>
        {/* {signIn()} */}
        continue with Google
      </button>
    </div>
  );
};

export default Login;