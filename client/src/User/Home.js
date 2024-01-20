import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ElectionPage from './elections/ElectionPage';
import { useUser } from '../user'; 
import Navbar from '../Widgets/NavBar';

const Homepage = () => {

  const navigate = useNavigate();
  const { setUser } = useUser();
  const hasSession = sessionStorage.getItem('user_token') !== null;

  if (!hasSession) {
    navigate('/');
  } 
  console.log("sesson"+sessionStorage.getItem('user_token'));
  


  return (
    <div>
      
    <Navbar name={sessionStorage.getItem('user_name')}/>


<main>
  
      <ElectionPage/>
</main>

    </div>
  );
};

export default Homepage;
