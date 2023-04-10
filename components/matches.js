import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionSetField } from '../src/client/Redux/slices/userSlice';

import Navbar from '../src/client/Components/Navbar/Navbar';


const Matches = (props) => {

  const hasPartner = useSelector((state) => state.user.hasPartner);
  // console.log('L11 of matches.js', hasPartner);

  const useInput = (init) => {
    const [value, setValue] = useState(init);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    return [value, onChange];
  };
  const [partnerEmail, partnerOnChange] = useInput('');

  const dispatch = useDispatch();
  const submitPartner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/connect', { id: currUser.id, partnerEmail });
      dispatch( actionSetField({ field: 'partnerInfo', value: response.data.email }) );
      dispatch( actionSetField({ field: 'hasPartner', value: response.data.has_partner }) );
    } catch(err) { console.log('ERROR IN submitPartner in movie.jsx: ', err); }
  };

  return (
    <>
      <Navbar />
      <p>in matches.js</p>
      {hasPartner || (<>PLEASE
        <form>
          <input name="getPartner" type="text" placeholder="your partner's email" value={partnerEmail} onChange={partnerOnChange} />
          <button type='submit' onClick={(e) => submitPartner(e)}>CONNECT!</button>
        </form>
      </>)}
    </>
  );
};


export default Matches;