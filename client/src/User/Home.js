

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ElectionPage from './elections/election';
import { useUser } from '../user'; // Adjust the path based on your file structure

const Homepage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const hasSession = sessionStorage.getItem('user_token') !== null;


  if (!hasSession) {
    navigate('/auth');
  } 
  console.log("sesson"+sessionStorage.getItem('user_token'));
  const handleLogout = () => {
    sessionStorage.removeItem('user_token');
    setUser(null);
    navigate('/');

  };

  return (
    <div>
      
<nav>
<b>Hello {sessionStorage.getItem('user_name')}</b>
      <button onClick={handleLogout}>Logout</button>

</nav>
      <ElectionPage/>

    </div>
  );
};

export default Homepage;
