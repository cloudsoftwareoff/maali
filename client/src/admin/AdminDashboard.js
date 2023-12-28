import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VoteResult from './Vote_result';
import AppConfig from '../config';
const AdminDashboard = () => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const hasSession = sessionStorage.getItem('admin_token') !== null;

    if (!hasSession) {
      navigate('/login');
    } else {
      
    
    }
  }, [navigate]);

  
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
      <td>
      <Link to="/adduser">
        <button>Add User</button>
      </Link>
      </td>
      <td>

      <Link to="/addcandidate">
        <button>Add Candidate</button>
      </Link>
      </td>
      <td>

      <button onClick={handleLogout}>Logout</button>
      </td>



      </table>
      <VoteResult/>
      
    </div>
  );
};

export default AdminDashboard;
