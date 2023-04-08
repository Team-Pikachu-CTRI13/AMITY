// import './App.css';
import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react'
// import { useSession, signIn, signOut } from "next-auth/react";
import Login from '../components/login';



// const App = () => {
//   return (
//     <div className='main'>
//       <BrowserRouter>
//         <div className='routes'>
//           <Routes>
//             <Route exact path='/' element={<Home />} />
//             <Route exact path='/login' element={<Login />} />
//             <Route exact path='/movie' element={<Movie />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// };

export default function Home() {


  // const { data: session } = useSession();
  // const email = session.user.email;
  const email = false;

  useEffect(() => {
    // const response = axios({
    //   method: 'get',
    //   withCredentials: true,
    //   url: 'http://localhost:8080/auth/user',
    // }).then(({data}) => {
    //   if (data) {
    //      const response = axios({
    //       method: 'get',
    //       withCredentials: true,
    //       url: `http://localhost:8080/auth/test/${data.sub}`,
    //     }).then(({data}) => {
    //       // console.log('?', data);
    //       if (data) {
    //         // console.log('!', data);
    //         dispatch(actionSetField({ field: 'email', value: data.email }));
    //         dispatch(actionSetField({ field: 'hasPartner', value: data.has_partner }));
    //         dispatch(actionSetField({ field: 'id', value: data.id }));
    //         dispatch(actionSetField({ field: 'page', value: data.page }));
    //         dispatch(actionSetField({ field: 'picture', value: data.picture }));
    //         dispatch(actionSetField({ field: 'sub', value: data.sub }));
    //       } else { console.log('error in home.js'); }
    //     });
    //   } else { console.log('error in home.js'); }
    // });
  });

  return(
    <>
      <p>next index.js</p>
      {/* {email && <Navbar />} */}
      {email ? <Movie /> : <Login />}

      {/* {session ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn()}>Sign in</button>} */}
    </>
  );
};