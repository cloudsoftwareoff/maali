import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VoteResult from './Vote_result';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const hasSession = sessionStorage.getItem('admin_token') !== null;

    if (!hasSession) {
      navigate('/login');
    } else {
      
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      
      const response = await fetch('http://127.0.0.1:3030/allvotes',
      {
        method:'GET',
        headers: {
        
           "Content-Type": "application/json", 
           "Authorization": `Bearer ${ sessionStorage.getItem('admin_token')}`, 
          
                }
            }
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
