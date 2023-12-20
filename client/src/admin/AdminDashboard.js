import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {

    const hasSession = sessionStorage.getItem('admin_token') !== null;
  
  
    if (!hasSession) {
      navigate('/login');
    }
}, []);
  const handleLogout = () => {
        sessionStorage.removeItem('admin_token');
       
        navigate('/login');
    
      };
      
    
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/adduser">
        <button>Add User</button>
      </Link>
      <Link to="/addcandidate">
        <button>Add Candidate</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>

     
    </div>
  );
};

export default AdminDashboard;
