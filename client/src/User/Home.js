

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ElectionPage from './elections/ElectionPage';
import { useUser } from '../user'; 
import Navbar from '../Widgets/NavBar';

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
      
     <Navbar name={sessionStorage.getItem('user_name')}/>
{/* <nav>
<b>Hello {}</b>
      <button onClick={handleLogout}>Logout</button>

</nav> */}
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<main>

      <ElectionPage/>
</main>

    </div>
  );
};

export default Homepage;
